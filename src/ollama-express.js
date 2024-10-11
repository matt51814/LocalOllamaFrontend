import express from 'express';
import { Ollama } from 'ollama';
import cors from "cors";
const corsOptions = {
    origin: 'http://host.docker.internal:5500'
};


const app = express();
const router = express.Router();
app.use(express.json());
app.use(cors(corsOptions));
const ollama = new Ollama({ host: 'http://host.docker.internal:11434' });

router.get('/', async (req, res) => {
    try {
        res.status(200).send('Ollama Express app running')
    } catch (error) {
        res.status(500).send('Error processing your request: ' + error.message);
    }
});


router.post('/ask-query', async (req, res) => {
    const { query } = req.body;

    try {
        const output = await ollama.generate({
            model: 'llama3.1',
            prompt: query
        });

        res.send(output.response);
    } catch (error) {
        res.status(500).send('Error processing your request: ' + error.message);
    }


})

app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});