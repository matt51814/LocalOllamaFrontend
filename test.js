import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://host.docker.internal:11434' })
const output = await ollama.generate({
	model: 'llama3.1',
	prompt: 'Who are you?'
})

console.log(output.response);
