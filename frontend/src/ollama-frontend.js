export function sendMessage() {
    // get query from textbox
    let query = document.getElementById('user-text').value;
    // if it is empty do nothing
    if (query === "") {
        return
    }
    // display the user conversation turn and increment counter
    document.getElementById("conversation-block").innerHTML += userTextBoxHtml(userChatN, query);
    userChatN += 1;
    // clear the input textbox
    document.getElementById('user-text').value = ""; 
    // trigger queryOllama function with the llm conversation turn number
    queryOllama(query, responseChatN);
    // increment llm conversation turn number
    responseChatN += 1;
    return
};

export function userTextBoxHtml(userChatN, query) {
    // take the user conversation turn number and the query value to build html
    return `
    <div class="user-text-box" id="user-text-box-${userChatN}">
    <p> ${query} </p>
    </div>
    <br>`;
}


export function llmTextBoxHtml(resChatNum){
    // take the llm conversation turn number to build the html
    return `
    <div class="llm-text-box" id="llm-text-box-${resChatNum}">
        <img class="ollama" src="./assets/ollama.svg" height="30">
    </div>
    <br>`;
}

export function createLlmTextBox(resChatNum) {
    // add the llm text box html element to conversation block div
    document.getElementById("conversation-block").innerHTML += llmTextBoxHtml(resChatNum);
    return    
}

async function queryOllama(query, resChatNum) {        
    // create llm text box html element in conversation block div
    createLlmTextBox(resChatNum); 
    // define the request parameters to query the LLM
    var requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "query": query
        }),
    };

    // send post request to LLM
    const result = await fetchPostRequest(queryUrl, requestOptions)
    displayFetchResult(result.message.content, resChatNum)
    return
};


export function displayFetchResult(resultString, resChatNum) {
    var chatbox = document.getElementById(`llm-text-box-${resChatNum}`);
    var txt = '';
    var i = 0;
    var refreshIntervalId = setInterval(function() {
        let length = resultString.split(' ').length;
        if (i < length) {
            txt += `${resultString.split(' ')[i]} `;
            chatbox.innerHTML = `<img class="ollama" src="./assets/ollama.svg" height="30"><div class="llm-text">${txt}</div><br>`;
        } else {
            clearInterval(refreshIntervalId);
        }
        i++;
    }, 100);
    return
};

async function fetchPostRequest(url, options) {
    const result = await fetch(url, options)
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
                        controller.enqueue(value)
                        let json = JSON.parse(new TextDecoder().decode(value))
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
    return result;
};


const input = document.getElementById('user-text');
// if input not null
if (input) {
    // on keydown
    input.addEventListener("keydown", (event) => {
        // if keydown was "Enter"
        if (event.key != "Enter") {
            return
        }
        event.preventDefault();
        // trigger sendMessage function
        sendMessage();
    });
};

// number the user and llm conversation turns
var userChatN = 1;
var responseChatN = 1;
// define the url to query llm
const queryUrl = "http://localhost:3000/api/ask-query";