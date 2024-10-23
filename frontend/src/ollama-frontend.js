function myFunction() {
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
        }
        
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
                const reader = rb.getReader();
                return new ReadableStream({
                    start(controller) {
                        function push() {
                            reader.read().then(async ({done, value}) => {
                                if (done) {
                                //     chatbox.innerHTML += "</p>";
                                //     console.log("done", done);
                                    controller.close();
                                    return;
                                }
                                // Fetch the individual words
                                await controller.enqueue(value);
                                let json = JSON.parse(new TextDecoder().decode(value));
                                console.log(json.response)
                                //chatbox.innerHTML += json.response;
                                push();
                            });
                        }
                        
                        push();
                    }
                });
            })
            .then(stream => 
                new Response(stream, { headers: { "Content-Type": "text/html" } }).json()
            )
            .then(result => {
                console.log("Result:" + result.message.content);
                chatbox.innerHTML += '<p>'
                chatbox.innerHTML += result.message.content;
                chatbox.innerHTML += '</p>'
            })
            // .then(json => {
            //     console.log(json.message.content)
            // });
        // const response = await fetch(url, requestOptions);
        // console.log(response.body)
        // return response;
    }

    queryOllama(query, responseChatN);
    responseChatN += 1;
    // document.getElementById("conversation-block").innerHTML += `
    // <div class="llm-text-box" id="llm-text-box-${responseChatN}">
    //     ${queryOllama(query)}
    // </div>
    // <br>`;
    return
}


function my2ndFunction(){
    var input = document.getElementById("user-text");
    console.log(input);
    input?.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          myFunction();
    }});
    return
}



var userChatN = 1;
var responseChatN = 1;