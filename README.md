# Local Ollama

Must have ollama installed locally. Currently uses llama3.2:1b model. Will make this customizable going forward.

Start the application:
```docker compose build; docker compose up```

TODO:
1. Have a chat side bar
2. Support for other models 
3. Add tests

I have began writing Javascript tests. To set up testing environment I am currently using the following commands:

1. ```docker run -it  -p 11434:11434 --mount type=bind,src="$(pwd)",target=/app alpine ```
2. ```cd app```
3. ```apk add nodejs npm```
4. ```npm install```
5. ```npm test```