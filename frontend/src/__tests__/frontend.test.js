/**
 * @jest-environment jsdom
 */

import { userTextBoxHtml, llmTextBoxHtml, createLlmTextBox, displayFetchResult } from '../ollama-frontend.js';
import {jest} from '@jest/globals';
import 'cross-fetch/polyfill';

jest.useFakeTimers()
jest.spyOn(global, 'setInterval');
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


test('display fetch result', () => {
    document.body.innerHTML = `<div class="llm-text-box" id="llm-text-box-1">
        <img class="ollama" src="./assets/ollama.svg" height="30">
    </div>`;
    displayFetchResult('hello world', '1');
    expect(setInterval).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(document.getElementById('llm-text-box-1').innerHTML).toBe(`<img class="ollama" src="./assets/ollama.svg" height="30"><div class="llm-text">hello world </div><br>`);

    //<img class="ollama" src="./assets/ollama.svg" height="30"><div class="llm-text">hello world</div>;
});
