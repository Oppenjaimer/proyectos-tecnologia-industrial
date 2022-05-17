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
}