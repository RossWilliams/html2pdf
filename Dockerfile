FROM keymetrics/pm2-docker-alpine:6
RUN mkdir /app
WORKDIR /app
ADD package.json ./
RUN npm i --production
ADD . /app
EXPOSE 3000
CMD["pm2", "start", "processes.json", "--no-daemon"]
