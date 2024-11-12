# Local Ollama

Must have ollama installed locally. Currently uses llama3.2:1b model. Will make this customizable going forward.

Start the application:
```docker compose build; docker compose up```

TODO:
1. Have a chat side bar
2. Support for other models 
3. Add tests

I have began writing Javascript tests. To set up testing environment I am currently using the following commands:

- ```docker compose -f docker-compose.tests.yml build; docker compose -f docker-compose.tests.yml up ```