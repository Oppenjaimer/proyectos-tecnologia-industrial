export class UnexpectedClassError extends Error {
    constructor(char: string) {
        super(`Unexpected character '${char}'`);
        this.name = "UnexpectedCharError";

        Object.setPrototypeOf(this, UnexpectedClassError.prototype);
    }
}