import { question as prompt } from "readline-sync";

import { Lexer, Parser } from "./core/index";

while (true) {
    try {
        const input = prompt("> ");
        if (!input) continue;
        if (input === ".exit") break;

        const lexer = new Lexer(input);
        const tokens = lexer.tokenize();

        const parser = new Parser(tokens);
        const tree = parser.parse();
    } catch (err) {
        if (err instanceof Error) console.error(`Error: ${err.message}`);
    }
}