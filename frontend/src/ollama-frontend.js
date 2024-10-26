function sendMessage() {
    let query = document.getElementById('user-text').value;
    if (query != '') {
        document.getElementById("conversation-block").innerHTML += `
        <div class="user-text-box" id="user-text-box-${userChatN}">
        <p> ${query} </p>
        </div>
        <br>`;
        userChatN += 1;
        document.getElementById('user-text').value = ""; 
    }

    async function queryOllama(query, resChatNum) {        
        
        document.getElementById("conversation-block").innerHTML += `
        <div class="llm-text-box" id="llm-text-box-${resChatNum}">
        </div>
        <br>`;

        chatbox = document.getElementById(`llm-text-box-${resChatNum}`);

        const url = "http://localhost:3000/api/ask-query";
        data = {
            "query": query
        };
        
        requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        fetch(url, requestOptions)
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
                chatbox.innerHTML += '<p>'
                chatbox.innerHTML += result.message.content
                chatbox.innerHTML += '</p>'
            });
    }

    queryOllama(query, responseChatN);
    responseChatN += 1;
    return
};

const input = document.getElementById('user-text');
if (input) {
    console.log(input.value)
    input.addEventListener("keydown", (event) => {
        if (event.key != "Enter") {
            return
        }
        if (userChatN === responseChatN) {
            event.preventDefault();
            sendMessage();
        }
    });
};

var userChatN = 1;
var responseChatN = 1;