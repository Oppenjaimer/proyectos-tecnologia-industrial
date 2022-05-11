import { question as prompt } from "readline-sync";

import { Lexer } from "./core/Lexer";

while (true) {
    try {
        const input = prompt("> ");
        if (!input) continue;
        if (input === ".exit") break;

        const lexer = new Lexer(input);
        const tokens = lexer.tokenize();
    } catch (err) {
        if (err instanceof Error) console.error(`Error: ${err.message}`);
    }
}