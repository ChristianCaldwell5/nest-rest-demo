import { HttpStatus } from "@nestjs/common";

export class AnimalError extends Error {
    status: HttpStatus

    constructor(message: string, status: HttpStatus) {
        super(message);
        this.status = status
    }
}