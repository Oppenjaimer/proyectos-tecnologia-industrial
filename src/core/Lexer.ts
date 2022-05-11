import { TokenType, Token } from "../components/index";
import { UnexpectedCharError } from "../errors/UnexpectedCharError";

export class Lexer {
    input: string;
    start: number;
    current: number;
    tokens: Token[];

    constructor(input: string) {
        this.input = input;
        this.start = 0;
        this.current = 0;
        this.tokens = [];
    }
}