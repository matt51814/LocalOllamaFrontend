/**
 * @jest-environment jsdom
 */

import { userTextBoxHtml, llmTextBoxHtml, createLlmTextBox, fetchPostRequest } from '../ollama-frontend.js';
import 'cross-fetch/polyfill';

test('generates correct user HTML element', () => {
    expect(userTextBoxHtml(1, "test")).toBe(`
    <div class="user-text-box" id="user-text-box-1">
    <p> test </p>
    </div>
    <br>`);
});

test('generates correct llm HTML element', () => {
    expect(llmTextBoxHtml(1)).toBe(`
    <div class="llm-text-box" id="llm-text-box-1">
        <img class="ollama" src="./assets/ollama.svg" height="30">
    </div>
    <br>`
    );
});

test('test creating LLM text box', () => {
    document.body.innerHTML = `<div class="conversation-block" id="conversation-block"></div>`;
    createLlmTextBox(1);
    expect(document.getElementById("conversation-block").innerHTML).toBe(`
    <div class="llm-text-box" id="llm-text-box-1">
        <img class="ollama" src="./assets/ollama.svg" height="30">
    </div>
    <br>`);
});




// ASYNC TESTS
// test('test fetchPostRequest', () => {
//     const queryUrl = "http://host.docker.internal:3000/api/ask-query";
//     var requestOptions = {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             "query": "return True"
//         }),
//     };


//     async function testFetchPostRequest(url, options) {
//         const result = await fetch(url, options)
//         .then(res => res.body)
//         .then(rb => rb.on('readable', () => {
//             let chunk;
//             while(null !== (chunk = rb.read())) {
//                 console.log(chunk.toString());
//             }
//         }))
//         return result
//     }


//     return testFetchPostRequest(queryUrl, requestOptions).then(data => {
//         expect(data).toBe('my_model')
//     })
// });


// export async function fetchPostRequest(url, options) {
//     const result = await fetch(url, options)
//     .then(res => res.body)
//     .then(rb => {
//         const reader = rb.getReader()
//         return new ReadableStream({
//             start(controller) {
//                 function push() {
//                     reader.read().then(async ({done, value}) => {
//                         if (done) {
//                             controller.close()
//                             return
//                         }
//                         // Fetch the individual words
//                         controller.enqueue(value)
//                         let json = JSON.parse(new TextDecoder().decode(value))
//                         push()
//                     })
//                 }
//                 push()
//             }
//         })
//     })
//     .then(stream => 
//         new Response(stream, { headers: { "Content-Type": "text/html" } }).json()
//     )
//     return result;
// };
