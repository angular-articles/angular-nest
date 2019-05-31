import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';


@Injectable()
export class ParamValidationPipe implements PipeTransform<any> {
    async transform(value: any, {metatype}: ArgumentMetadata) {
        if (!metatype || !ParamValidationPipe.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            const transformedErrors = errors.map(error => {
                return {
                    code: 400,
                    status: 'Bad Request',
                    title: 'Validation failed',
                    detail: Object.values(error.constraints).join('. '),
                    source: {
                        parameter: error.property
                    }
                }
            });

            throw new BadRequestException({
                errors: transformedErrors
            });
        }

        return object;
    }

    private static toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];

        return !types.includes(metatype);
    }
}
