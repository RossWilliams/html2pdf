FROM keymetrics/pm2-docker-alpine:6
RUN mkdir -p /var/www/app
WORKDIR /var/www/app
ADD package.json ./
RUN npm i --production
ADD . /var/www/app
EXPOSE 3000
CMD ["pm2", "start", "process.json", "--no-daemon"]
