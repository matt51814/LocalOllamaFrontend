# syntax=docker/dockerfile:1
FROM node
EXPOSE 3000
EXPOSE 11434
COPY . .
RUN npm install -g ollama
RUN npm install -g cors
RUN npm install -g express
CMD ["node", "backend/src/ollama-express.js"]