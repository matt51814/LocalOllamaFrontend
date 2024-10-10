# syntax=docker/dockerfile:1
FROM node:alpine
RUN npm install -g ollama
RUN npm install -g live-server
EXPOSE 3000
EXPOSE 11434
COPY . .
CMD ["node", "test.js"]