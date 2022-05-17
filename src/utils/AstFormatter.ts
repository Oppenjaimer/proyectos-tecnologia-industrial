import { Token, TokenType, Expr } from "../components/index";

export class AstFormatter implements Expr.Visitor<string> {
    tree: Expr;

    constructor(tree: Expr) {
        this.tree = tree;
    }

    format(): string {
        return this.removeOuterParentheses(this.tree.accept(this));
    }

    visitUnaryExpr(expression: Expr.Unary): string {
        return `${this.getOperatorSymbol(expression.operator)}${this.evaluate(expression.right)}`;
    }

    visitBinaryExpr(expression: Expr.Binary): string {
        return `(${this.evaluate(expression.left)} ${this.getOperatorSymbol(expression.operator)} ${this.evaluate(expression.right)})`;
    }

    visitVariableExpr(expression: Expr.Variable): string {
        return expression.name;
    }

    visitGroupingExpr(expression: Expr.Grouping): string {
        return this.evaluate(expression.expression);
    }

    private removeOuterParentheses(str: string): string {
        if (/^\(.*\)$/.test(str)) return str.slice(1, -1);
        return str;
    }

    private getOperatorSymbol(operator: Token): string {
        switch (operator.type) {
            case TokenType.NEGATION: return "¬";
            case TokenType.CONJUNCTION: return "∧";
            case TokenType.DISJUNCTION: return "∨";
            case TokenType.IMPLICATION: return "→";
            case TokenType.EQUIVALENCE: return "↔";
        }

        return operator.value;
    }

    private evaluate(expression: Expr): string {
        return expression.accept(this);
    }
}