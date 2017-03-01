// delay for images, zoom out the page, then render
setTimeout(function(){
  picturefill();
  document.querySelector('html').style.zoom = 0.65;
  window.renderable = 'ready';
}, 4000);
