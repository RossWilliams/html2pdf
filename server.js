var http = require('http');
var path = require('path');
var fs = require('fs');
var validurl = require('valid-url');
var stream = require('stream');
var util = require('util');

// create express server
var express = require('express');
var app = express();
var cors = require('cors');
var port = process.env.PORT || '3000';
var bodyParser = require('body-parser');
var phantom = require('phantom-render-stream');
var render = phantom();


app.locals.pretty = process.env.PORT ? false : true;
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// get route ... just post something
app.get('/', function(req, res) {
  res.status(500).send({ error: 'Access denied' });
});

// post route
app.post('/', function(req, res) {
/*
  if (!req.get('authorization') !== process.env.AUTH_KEY) {
    res.status(500, { error: 'Access denied' });
    return;
  }
  */
  console.log(req.body);

  // does the request have a url?
  if (!req.body.url) {
    res.status(500).send({ error: 'url missing from request' });
  }

  var url = req.body.url;

  // is the url valid??
  if (!validurl.isUri(url)) {
    res.status(500).send({ error: 'url is not valid' });
  }

  // it's valid! process it ...

  // set the return headers
  res.setHeader('Content-disposition', 'attachment; filename="hondaconfiguration.pdf"');
  res.setHeader('Content-type', 'application/pdf');

  // create the render stream
  render(url, {
    format:'pdf',
    width: 600,
    height: 600,
    quality: 100,
    paperFormat: 'A4',
    orientation: 'portrait',
    margin: '0',
    printMedia  : true,
    expects: 'ready',
    injectJs: ['./includes/wait-for-images.js']
  })

  // pipe it to res for output
  .pipe(res);

});

// listen
http.createServer(app).listen(port);
