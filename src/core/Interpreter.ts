import { Token, TokenType, Expr } from "../components/index";
import { AstFormatter } from "../utils/AstFormatter";
import { TableRow, Table } from "../types";

export class Interpreter implements Expr.Visitor<boolean> {
    tree: Expr;
    values: TableRow;
    results: boolean[];

    constructor(tree: Expr) {
        this.tree = tree;
        this.values = {};
        this.results = [];
    }

    generateTruthTable(variables: Token[]): Table {
        this.results = [];

        const table: Table = [];

        for (let i = 0; i < Math.pow(2, variables.length); i++) {
            let binary = i.toString(2);
            binary = "0".repeat(variables.length - binary.length) + binary;
            
            const values: TableRow = {};
            for (let j = 0; j < variables.length; j++) {
                values[variables[j].value] = !!+binary.charAt(j);
            }

            const formula = new AstFormatter(this.tree).format();
            const result = this.interpret(values);
            values[formula] = result;
            this.results.push(result);
            table.push(values);
        }

        return table;
    }

    private interpret(values: TableRow): boolean {
        this.values = values;
        return this.tree.accept(this);
    }

    visitUnaryExpr(expression: Expr.Unary): boolean {
        const right = this.evaluate(expression.right);
        return !right;
    }

    visitBinaryExpr(expression: Expr.Binary): boolean {
        const left = this.evaluate(expression.left);
        const right = this.evaluate(expression.right);

        switch (expression.operator.type) {
            case TokenType.CONJUNCTION: return left && right;
            case TokenType.DISJUNCTION: return left || right;
            case TokenType.IMPLICATION: return !left || right
            case TokenType.EQUIVALENCE: return left === right;
        }

        // Unreachable
        return false;
    }

    visitVariableExpr(expression: Expr.Variable): boolean {
        return this.values[expression.name];
    }

    visitGroupingExpr(expression: Expr.Grouping): boolean {
        return this.evaluate(expression.expression);
    }

    private evaluate(expression: Expr): boolean {
        return expression.accept(this);
    }
}