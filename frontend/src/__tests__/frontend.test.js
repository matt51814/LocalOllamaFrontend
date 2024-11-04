/**
 * @jest-environment jsdom
 */

import { userTextBoxHtml, llmTextBoxHtml, createLlmTextBox } from '../ollama-frontend.js';

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