FROM node:14.16.1-buster-slim as angular
WORKDIR /app
COPY package.json ./
RUN npm install --silent
COPY . .

RUN npm run build


### STAGE 2: Run ###
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/smartkanvas-front/browser /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
