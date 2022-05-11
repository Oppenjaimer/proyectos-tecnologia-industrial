export class UnexpectedCharError extends Error {
    constructor(char: string) {
        super(`Unexpected character '${char}'`);
        this.name = "UnexpectedCharError";

        Object.setPrototypeOf(this, UnexpectedCharError.prototype);
    }
}