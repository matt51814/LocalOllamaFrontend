import express from 'express';
import { Ollama } from 'ollama';
import cors from "cors";

// allow cors request from frontend
const corsOptions = {
    origin: 'http://localhost:8080'
};

const app = express();
const router = express.Router();
app.use(express.json());
app.use(cors(corsOptions));
// create ollama object pointed at host machine ollama port
const ollama = new Ollama({ host: 'http://host.docker.internal:11434' });

// create a model file for ollama
const modelfile = `
FROM llama3.2:1b
SYSTEM "You are a helpful assistant. Please form your response as html and make it logically fit within the following div: "<div class="llm-text"></div>". Make sure the header is aligned to the left. Keep your responses concise."
`;
await ollama.create({ model: 'my_model', modelfile: modelfile });

// define a list to store the conversation history
const messages_list = [];

router.get('/', async (req, res) => {
    try {
        res.status(200).send('Ollama Express app running');
    } catch (error) {
        res.status(500).send('Error processing your request: ' + error.message);;
    }
});

router.post('/ask-query', async (req, res) => {
    var { query } = await req.body;
    // remove whitespace from query
    query = query.split(/\r?\n|\r/).join('');

    // create json for role and content (see ollama docs)
    var content = JSON.stringify({
        role: "user",
        content: query
    });

    // add to conversation history list
    messages_list.push(JSON.parse(content));

    try {
        // send conversation history and new query to ollama model
        const output = await ollama.chat({
            model: 'my_model',
            messages: messages_list
        });
        messages_list.push(output.message);
        // return output
        res.status(200).send(output);
    } catch (error) {
        res.status(500).send('Error processing your request: ' + error.message);
    }
});

app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});