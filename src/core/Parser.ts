import { TokenType, Token, Expr } from "../components/index";
import { ParseError } from "../errors/ParseError";

export class Parser {
    tokens: Token[];
    current: number;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.current = 0;
    }
}