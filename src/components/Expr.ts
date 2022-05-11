import { Token } from "./Token";

export type Expr = Expr.Unary | Expr.Binary | Expr.Variable | Expr.Grouping;

export namespace Expr {
    export interface Visitor<R> {
        visitUnaryExpr(expression: Unary): R;
        visitBinaryExpr(expression: Binary): R;
        visitVariableExpr(expression: Variable): R;
        visitGroupingExpr(expression: Grouping): R;
    }

    export class Unary {
        operator: Token;
        right: Expr;

        constructor(operator: Token, right: Expr) {
            this.operator = operator;
            this.right = right;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitUnaryExpr(this);
        }
    }

    export class Binary {
        left: Expr;
        operator: Token;
        right: Expr;

        constructor(left: Expr, operator: Token, right: Expr) {
            this.left = left;
            this.operator = operator;
            this.right = right;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitBinaryExpr(this);
        }
    }

    export class Variable {
        name: string;

        constructor(name: string) {
            this.name = name;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitVariableExpr(this);
        }
    }

    export class Grouping {
        expression: Expr;

        constructor(expression: Expr) {
            this.expression = expression;
        }

        accept<R>(visitor: Visitor<R>): R {
            return visitor.visitGroupingExpr(this);
        }
    }
}