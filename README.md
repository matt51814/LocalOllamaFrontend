# Local Ollama

Currently when sending queries using the ENTER key, it seems to send multiple empty messages to the messages_list on the backend. 
This breaks everything.

Must have ollama installed locally. Currently uses llama3.2:1b model. Will make this customizable going forward.

Start the application:
```docker compose build; docker compose up```

TODO:
1. Have a chat side bar
2. Support for other models 
3. Add tests
