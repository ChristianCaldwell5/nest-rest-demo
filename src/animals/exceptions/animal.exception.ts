import { HttpException, HttpStatus } from "@nestjs/common";

export class AnimalException extends HttpException {
    
    constructor(message: any, status: HttpStatus) {
        let customMessage = {
            status: status,
            message: message,
            timestamp: Date.now()
        }
        super(customMessage, status);
    }

}