function sendMessage() {
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

function userTextBoxHtml(userChatN, query) {
    // take the user conversation turn number and the query value to build html
    return `
    <div class="user-text-box" id="user-text-box-${userChatN}">
    <p> ${query} </p>
    </div>
    <br>`;
}


function llmTextBoxHtml(resChatNum){
    // take the llm conversation turn number to build the html
    return `
    <div class="llm-text-box" id="llm-text-box-${resChatNum}">
        <img class="ollama" src="./assets/ollama.svg" height="30">
    </div>
    <br>`;
}

function createLlmTextBox(resChatNum) {
    // add the llm text box html element to conversation block div
    document.getElementById("conversation-block").innerHTML += llmTextBoxHtml(resChatNum);
    return    
}

async function queryOllama(query, resChatNum) {        
    // create llm text box html element in conversation block div
    createLlmTextBox(resChatNum);
    // get this element
    var chatbox = document.getElementById(`llm-text-box-${resChatNum}`);
    
    // define the request parameters to query the LLM
    requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "query": query
        }),
    };

    // // fetch the llama response
    // fetch(queryUrl, requestOptions)
    //     // retrieve it's body as ReadableStream
    //     .then((res) => {
    //         const reader = res.body.getReader();
    //         return new ReadableStream({
    //             start(controller){
    //                 function push() {
    //                     reader.read().then(async ({done, value}) => {
    //                         if (done) {
    //                             controller.close()
    //                             return
    //                         }
    //                         controller.enqueue(value)

    //                     })
    //                 }
    //             }
    //         })
        
        
        
        
         
        
    //     })




    // send post request to LLM
    const result = await fetch(queryUrl, requestOptions)
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
        console.log(result);
        //chatbox.innerHTML = '<div class="llm-text"></div>';
        console.log(result.message.content.split(' '));
        var txt = '';
        var i = 0;
        var refreshIntervalId = setInterval(function() {
            let length = result.message.content.split(' ').length;
            if (i < length) {
                txt += `${result.message.content.split(' ')[i]} `;
                chatbox.innerHTML = `<img class="ollama" src="./assets/ollama.svg" height="30"><div class="llm-text">${txt}</div><br>`;
            } else {
                clearInterval(refreshIntervalId);
            }
            i++;
        }, 100);

    };



        // for (const element of result.message.content.split(' ')) {
            // ...use `element`...
            // console.log(element);
            // txt += `${element} `;
            // console.log(txt);
            // document.documentElement.innerHTML = `<pre>${document.documentElement.innerHTML.replace(
            //     /</g,
            //     "&lt;",
            //   )}</pre>`
            // console.log(`<div class="llm-text">${txt}</div>`);
            //chatbox.innerHTML = `<div class="llm-text">${txt}</div>`;
            // chatbox.textContent=txt;
            
            // chatbox.innerHTML += element;
            // chatbox.innerHTML += ' ';
            // chatbox.innerHTML += '</div>'
            // var txt = chatbox.innerHTML.split('</div>')[0];
            // chatbox.innerHTML = txt;
            // var txt = element
            // this isn't working correctly because we dont close the div (and potentially other tags until we write all the text in)!!!
        // };
        // .then(result => {
        //     // add to html element
        //     chatbox.innerHTML += '<div class="llm-text">'
        //     chatbox.innerHTML += '<p>'
        //     chatbox.innerHTML += result.message.content
        //     chatbox.innerHTML += '</p>'
        //     chatbox.innerHTML += '</div>'
        // });
// };





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