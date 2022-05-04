import { question as prompt } from "readline-sync";

while (true) {
    try {
        const input = prompt("Logical formula: ");
        if (!input) continue;
        if (input === ".exit") break;
    } catch (err) {
        if (err instanceof Error) console.error(`Error: ${err.message}`);
    }
}