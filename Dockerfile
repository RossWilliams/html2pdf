FROM keymetrics/pm2-docker-alpine:6
RUN MKDIR /app
WORKDIR /app
COPY . /app
RUN npm install --production
EXPOSE 3000
CMD["pm2", "start", "processes.json", "--no-daemon"]
