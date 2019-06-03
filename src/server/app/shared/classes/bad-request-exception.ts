import { BadRequestException as NestBadRequestException } from "@nestjs/common";

import { errorType } from "../interfaces/json-api";

export class BadRequestException extends NestBadRequestException {
    constructor(message?: { errors: errorType[] }, error?: string) {
        super(message, error);
    }
}
