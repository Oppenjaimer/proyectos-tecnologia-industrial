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

    tokenize(): Token[] {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }

        this.tokens.push(new Token(TokenType.EOF, ""));
        return this.tokens;
    }

    getVariables(): Token[] {
        const variables = this.tokens.filter(token => token.type === TokenType.VARIABLE);
        const usedVariables: string[] = [];
        const uniqueVariables: Token[] = [];

        for (let variable of variables) {
            if (usedVariables.includes(variable.value)) continue;

            usedVariables.push(variable.value);
            uniqueVariables.push(variable);
        }

        return uniqueVariables.sort((a, b) => a.value.localeCompare(b.value));
    }

    private scanToken() {
        const char = this.advance();
        switch (char) {
            case "-": this.addToken(TokenType.NEGATION); break;
            case "&": this.addToken(TokenType.CONJUNCTION); break;
            case "|": this.addToken(TokenType.DISJUNCTION); break;
            case ">": this.addToken(TokenType.IMPLICATION); break;
            case "=": this.addToken(TokenType.EQUIVALENCE); break;
            case "(": this.addToken(TokenType.LPAREN); break;
            case ")": this.addToken(TokenType.RPAREN); break;

            case " ":
            case "\r":
            case "\t":
                break;

            default:
                if (this.isAlpha(char)) this.variable();
                else throw new UnexpectedCharError(char);
                break;
        }
    }

    private variable() {
        while (this.isAlpha(this.input.charAt(this.current))) this.advance();
        this.addToken(TokenType.VARIABLE);
    }

    private addToken(type: TokenType) {
        const text = this.input.substring(this.start, this.current);
        this.tokens.push(new Token(type, text));
    }

    private advance(): string {
        return this.input.charAt(this.current++);
    }

    private isAlpha(char: string): boolean {
        return /^[a-zA-Z]$/.test(char);
    }

    private isAtEnd(): boolean {
        return this.current >= this.input.length;
    }
}