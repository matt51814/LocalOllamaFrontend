/**
 * @jest-environment jsdom
 */


import {} from '../ollama-express.js';
import 'cross-fetch/polyfill';

// ASYNC TESTS
test('test get', async () => {
    const queryUrl = "http://host.docker.internal:3000/api";
    var requestOptions = {
        method: "GET",
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        // body: JSON.stringify({
        //     "query": "return True"
        // }),
    };

    const response = await fetch(queryUrl, requestOptions);
    expect(response.status).toBe(200);

});


test('test post', async () => {
    const queryUrl = "http://host.docker.internal:3000/api/ask-query";
    var requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "query": "return True"
        }),
    };

    const response = await fetch(queryUrl, requestOptions);
    expect(response.status).toBe(200);
}, 15000);