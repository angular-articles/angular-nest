import { UnauthorizedException as NestUnauthorizedException } from "@nestjs/common";

import { JsonApiArgs } from "../interfaces/json-api";

export class UnauthorizedException extends NestUnauthorizedException {
    constructor(message?: JsonApiArgs, error?: string) {
        super(message, error);
    }
}
