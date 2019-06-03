import { HttpStatus } from "@nestjs/common";

import { errorType } from '../interfaces/json-api';

export function ErrorMongoHelper(code, controller?: string, method?: string): { errors: errorType[] } {
    switch (code) {
        case ('user not found by email'):
            return {
                errors: [{
                    code: HttpStatus.BAD_REQUEST,
                    status: 'Bad Request',
                    title: 'User not found',
                    detail: 'User with such email not found',
                    source: {
                        parameter: 'email'
                    }
                }]
            };

        case ('user not found by id'):
            return {
                errors: [{
                    code: HttpStatus.BAD_REQUEST,
                    status: 'Bad Request',
                    title: 'User not found',
                    detail: 'User with such _id not found',
                    source: {
                        parameter: '_id'
                    }
                }]
            };

        case (11000):
            if (controller === 'UserController') {
                if (method === 'updateUser') {
                    return {
                        errors: [{
                            code: HttpStatus.BAD_REQUEST,
                            status: 'Bad Request',
                            title: 'User exist',
                            detail: 'User with such email exists',
                            source: {
                                parameter: 'email'
                            }
                        }]
                    };
                }
            }
    }
}
