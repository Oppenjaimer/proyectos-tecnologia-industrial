import chalk = require("chalk");
import { table, TableUserConfig } from "table";
import { Table, ColoredTable } from "../types";

function colorInput(input: Table): ColoredTable {
    const result: ColoredTable = [];

    const headers = Object.keys(input[0]);
    result.push(headers.map(h => {
        if (/^[a-zA-Z]$/.test(h)) return chalk.yellow(h);
        return h.split("").map(c => /^[a-zA-Z]$/.test(c) ? chalk.yellow(c) : chalk.magenta(c)).join("")
    }));

    for (let i = 0; i < input.length; i++) {
        const obj = input[i];
        const values = Object.values(obj);
        result.push(values.map(v => v ? chalk.green("T") : chalk.red("F")));
    }

    return result;
}

export function printTable(input: Table) {
    const coloredInput = colorInput(input);
    const config: TableUserConfig = {
        border: {
            topBody: "─",
            topJoin: "┬",
            topLeft: "┌",
            topRight: "┐",
        
            bottomBody: "─",
            bottomJoin: "┴",
            bottomLeft: "└",
            bottomRight: "┘",
        
            bodyLeft: "│",
            bodyRight: "│",
            bodyJoin: "│",
        
            joinBody: "─",
            joinLeft: "├",
            joinRight: "┤",
            joinJoin: "┼"
        },
        columnDefault: {
            alignment: "center",
            verticalAlignment: "middle"
        }
    }

    console.log(table(coloredInput, config));
}