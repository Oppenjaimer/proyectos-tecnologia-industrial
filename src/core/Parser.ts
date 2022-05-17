import { TokenType, Token, Expr } from "../components/index";
import { ParseError } from "../errors/ParseError";

export class Parser {
    tokens: Token[];
    current: number;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.current = 0;
    }

    parse(): Expr {
        const expression = this.expression();

        if (!this.isAtEnd()) throw new ParseError("Not all tokens were consumed");

        return expression;
    }

    private expression(): Expr {
        return this.equivalence();
    }

    private equivalence(): Expr {
        let expr = this.implication();

        while (this.match(TokenType.EQUIVALENCE)) {
            const operator = this.previous();
            const right = this.implication();
            expr = new Expr.Binary(expr, operator, right);
        }

        return expr;
    }

    private implication(): Expr {
        let expr = this.disjunction();

        while (this.match(TokenType.IMPLICATION)) {
            const operator = this.previous();
            const right = this.disjunction();
            expr = new Expr.Binary(expr, operator, right);
        }

        return expr;
    }

    private disjunction(): Expr {
        let expr = this.conjunction();

        while (this.match(TokenType.DISJUNCTION)) {
            const operator = this.previous();
            const right = this.conjunction();
            expr = new Expr.Binary(expr, operator, right);
        }

        return expr;
    }

    private conjunction(): Expr {
        let expr = this.negation();

        while (this.match(TokenType.CONJUNCTION)) {
            const operator = this.previous();
            const right = this.negation();
            expr = new Expr.Binary(expr, operator, right);
        }

        return expr;
    }

    private negation(): Expr {
        while (this.match(TokenType.NEGATION)) {
            const operator = this.previous();
            const right = this.negation();
            return new Expr.Unary(operator, right);
        }

        return this.primary();
    }

    private primary(): Expr {
        if (this.match(TokenType.VARIABLE)) return new Expr.Variable(this.previous().value);

        if (this.match(TokenType.LPAREN)) {
            const expr = this.expression();
            this.consume(TokenType.RPAREN, "Expected ')' after expression");
            return new Expr.Grouping(expr);
        }

        throw new ParseError("Expected expression");
    }

    private match(type: TokenType): boolean {
        if (this.check(type)) {
            this.advance();
            return true;
        }

        return false;
    }

    private consume(type: TokenType, message: string): Token {
        if (this.check(type)) return this.advance();
        throw new ParseError(message);
    }

    private check(type: TokenType): boolean {
        if (this.isAtEnd()) return false;
        return this.peek().type === type;
    }

    private advance(): Token {
        if (!this.isAtEnd()) this.current++;
        return this.previous();
    }

    private isAtEnd(): boolean {
        return this.peek().type === TokenType.EOF;
    }

    private peek(): Token {
        return this.tokens[this.current];
    }

    private previous(): Token {
        return this.tokens[this.current - 1];
    }
}