import {
    BadGatewayException, CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor
} from '@nestjs/common';

import { catchError } from 'rxjs/operators';
import { ErrorMongoHelper } from "./error-mongo.helper";
import { MongoError } from "mongodb";
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    json: {
        jsonapi: {
            version: 1.0
        },
        data?: any,
        errors?: any[]
    } = {
        jsonapi: {
            version: 1.0
        }
    };

    intercept(context: ExecutionContext, next: CallHandler): Observable<HttpException | BadGatewayException> {
        return next
            .handle()
            .pipe(
                catchError(err => {
                    if (err instanceof MongoError) {
                        return throwError(new HttpException({
                            ...this.json,
                            ...ErrorMongoHelper(err.code, context.getClass().name, context.getHandler().name)
                        }, 400));
                    }

                    if (err.response && err.response.errors.length) {
                        return throwError(new HttpException({
                            ...this.json,
                            errors: err.response.errors
                        }, err.status));
                    }

                    return throwError(new BadGatewayException())
                })
            );
    }
}
