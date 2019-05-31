import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { JsonApiResponse } from "../interfaces/json-api";


@Injectable()
export class DataInterceptor<T> implements NestInterceptor<JsonApiResponse> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<JsonApiResponse> {
        return next.handle()
            .pipe(
                map(data => {
                    return {
                        jsonapi: {
                            version: 1.0
                        },
                        data
                    };
                })
            );
    }
}
