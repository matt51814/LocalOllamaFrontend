# syntax=docker/dockerfile:1
FROM alpine
COPY .. .
RUN apk add nodejs npm
RUN npm install
ENTRYPOINT ["npm", "test"]