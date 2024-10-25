import express from 'express';
import { Ollama } from 'ollama';
import cors from "cors";
const corsOptions = {
    origin: 'http://localhost:8080'
};

const app = express();
const router = express.Router();
app.use(express.json());
app.use(cors(corsOptions));
const ollama = new Ollama({ host: 'http://host.docker.internal:11434' });

const modelfile = `
FROM llama3.2:1b
SYSTEM "Create all your responses in html format with a header summarising your response using a h2 tag. Keep your resposes concise."
`;
await ollama.create({ model: 'my_model', modelfile: modelfile });

const messages_list = [];

router.get('/', async (req, res) => {
    try {
        res.status(200).send('Ollama Express app running');
    } catch (error) {
        res.status(500).send('Error processing your request: ' + error.message);;
    }
});

router.post('/ask-query', async (req, res) => {
    const { query } = await req.body;
    console.log(query);
    //query = query.trim(); // remove whitespace as this breaks everything
    //var content = `{"role": "user","content": "${query}"}`;
    var content = JSON.stringify({
        role: "user",
        content: query.trim()
    });
    messages_list.push(JSON.parse(content));
    console.log(messages_list);
    try {
        const output = await ollama.chat({
            model: 'my_model',
            messages: messages_list
        });
        messages_list.push(output.message);
        res.send(output);
    } catch (error) {
        res.status(500).send('Error processing your request: ' + error.message);
    }
});

app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});