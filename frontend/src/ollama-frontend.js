function sendMessage() {
    let query = document.getElementById('user-text').value;
    if (query != '') {
        document.getElementById("conversation-block").innerHTML += userTextBoxHtml(userChatN, query);
        userChatN += 1;
        document.getElementById('user-text').value = ""; 
    }
    queryOllama(query, responseChatN);
    responseChatN += 1;
    return
};

function userTextBoxHtml(userChatN, query) {
    return `
    <div class="user-text-box" id="user-text-box-${userChatN}">
    <p> ${query} </p>
    </div>
    <br>`;
}


function llmTextBoxHtml(resChatNum){
    return `
    <div class="llm-text-box" id="llm-text-box-${resChatNum}">
        <img class="ollama" src="./assets/ollama.svg" height="30">
    </div>
    <br>`;
}


function createLlmTextBox(resChatNum) {
    document.getElementById("conversation-block").innerHTML += llmTextBoxHtml(resChatNum);
    return    
}

async function queryOllama(query, resChatNum) {        
        
    createLlmTextBox(resChatNum);

    chatbox = document.getElementById(`llm-text-box-${resChatNum}`);
    
    requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "query": query
        }),
    };

    fetch(queryUrl, requestOptions)
        .then(res => res.body)
        .then(rb => {
            const reader = rb.getReader()
            return new ReadableStream({
                start(controller) {
                    function push() {
                        reader.read().then(async ({done, value}) => {
                            if (done) {
                                controller.close()
                                return
                            }
                            // Fetch the individual words
                            // await controller.enqueue(value);
                            controller.enqueue(value)
                            let json = JSON.parse(new TextDecoder().decode(value))
                            console.log(json.response)
                            push()
                        })
                    }
                    
                    push()
                }
            })
        })
        .then(stream => 
            new Response(stream, { headers: { "Content-Type": "text/html" } }).json()
        )
        .then(result => {
            console.log("Result:" + result.message.content)
            chatbox.innerHTML += '<div class="llm-text">'
            chatbox.innerHTML += '<p>'
            chatbox.innerHTML += result.message.content
            chatbox.innerHTML += '</p>'
            chatbox.innerHTML += '</div>'
        });
};

const input = document.getElementById('user-text');
if (input) {
    console.log(input.value)
    input.addEventListener("keydown", (event) => {
        if (event.key != "Enter") {
            return
        }
        event.preventDefault();
        sendMessage();
    });
};

var userChatN = 1;
var responseChatN = 1;
const queryUrl = "http://localhost:3000/api/ask-query";