import { question as prompt } from "readline-sync";

import { Lexer, Parser, Interpreter } from "./core/index";
import { printTable } from "./utils/printTable";

console.log("----- Logic Parser v1.1.0 -----");
console.log("Type '.exit' to stop the program\n")

while (true) {
    try {
        const input = prompt("> ");
        if (!input) continue;
        if (input === ".exit") break;

        const lexer = new Lexer(input);
        const tokens = lexer.tokenize();

        const parser = new Parser(tokens);
        const tree = parser.parse();

        const interpreter = new Interpreter(tree);
        const table = interpreter.generateTruthTable(lexer.getVariables());

        console.log();
        printTable(table);
        console.log(`Formula is ${interpreter.results.every(Boolean) ? "a tautology" : interpreter.results.some(Boolean) ? "satisfiable" : "a contradiction"}\n`);
    } catch (err) {
        if (err instanceof Error) console.error(`Error: ${err.message}`);
    }
}