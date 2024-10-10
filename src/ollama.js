const url = "http://localhost:11434/api/generate";
const query = "hello";
const options = {
    "method": "POST",
    "header": {
        "Content-Type": "json"
    },
    "body": {
        "model": "llama3.1",
        "prompt": "hello"
    }
};

//fetch(url, options).then(res => res.json()).then(data => console.log(data));

async function getOllamaResponse(query) {
    const response = await fetch(
        "http://localhost:11434/api/generate",
        {
            method: "POST", body: JSON.stringify(
                {
                    "model": "llama3.1", 
                    "prompt": query
                }
            )
        }
    )
    return response;
}
console.log(getOllamaResponse("hello"))



// import ollama from "ollama";

// async function getOllamaResponse(query) {
//     let response = await ollama.chat({
//         model: 'llama3.1',
//         messages: [{ role: 'user', content: `${query}`}],
//     });
//     return response.message.content;
// }



// var userChatN = 1;
// var responseChatN = 1;
// function myFunction() {
//     let query = document.getElementById('user-text').value;
//     if (query != '') {
//         document.getElementById("conversation-block").innerHTML += `
//         <div class="user-text-box" id="user-text-box-${userChatN}">
//         ${query}
//         </div>
//         <br>`;
//         userChatN += 1;
//         document.getElementById('user-text').value = ""; 
//     }

//     async function getOllamaResponse(query) {
//         let response = await ollama.chat({
//             model: 'llama3.1',
//             messages: [{ role: 'user', content: `${query}`}],
//         });
//         return response.message.content;
//     }


//     console.log(getOllamaResponse(query))



    //const url = "http://host.docker.internal:11434/api/generate";

    //const options = {
    //    data: {
    //        "model": "llama3.1",
    //        "prompt": query
    //    }
    //};

    //fetch(url, options).then(res => res.json()).then(data => console.log(data));


    // const response = getOllamaResponse(query);
    // console.log(response);
    // document.getElementById("conversation-block").innerHTML += `
    // <div class="llm-text-box" id="llm-text-box-${responseChatN}">
    //     ${response}
    // </div>
    // <br>`;

//}

//console.log(getOllamaResponse('hello'))


// const url = "http://host.docker.internal:11434/api/generate";
// const query = "hello";
// const options = {
//     "model": "llama3.1",
//     "prompt": "hello"
// };

// fetch(url, options).then(res => res.json()).then(data => console.log(data));
