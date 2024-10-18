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
const messages_list = [];

router.get('/', async (req, res) => {
    try {
        res.status(200).send('Ollama Express app running')
    } catch (error) {
        res.status(500).send('Error processing your request: ' + error.message);
    }
});

router.post('/ask-query', async (req, res) => {
    const { query } = await req.body;
    console.log(query);
    var content = `{"role": "user","content": "${query}"}`;
    messages_list.push(JSON.parse(content));
    console.log(messages_list);
    try {
        const output = await ollama.chat({
            model: 'llama3.2:1b',
            messages: messages_list
            // messages: [{
            //     "role": "user",
            //     "content": query
            // }]
        });
        messages_list.push(output.message);
        res.send(output);
        //console.log(output.message);
        // message_history.push(JSON.parse(output["message"]));

        //messages: [{ role: 'user', content: 'Why is the sky blue?' }]
    } catch (error) {
        res.status(500).send('Error processing your request: ' + error.message);
    }
})

app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});