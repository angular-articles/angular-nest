import {
    All, Body, ClassSerializerInterceptor, Controller, HttpStatus, MethodNotAllowedException, Post, Req, UseInterceptors
} from '@nestjs/common';

import { Request } from 'express';

import { AuthService } from "./auth.service";
import { ParamValidationPipe } from "../user/pipes/param-validation.pipe";
import { SignInDto } from "./dto/sign-in.dto";
import { UserEntity } from "../user/user.entity";


@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('sign-in')
    async signIn(@Body(new ParamValidationPipe()) signInDto: SignInDto): Promise<UserEntity> {
        return this.authService.signIn(signInDto);
    }

    @All()
    async otherMethods(@Req() req: Request): Promise<MethodNotAllowedException> {
        throw new MethodNotAllowedException({
            errors: [{
                code: HttpStatus.METHOD_NOT_ALLOWED,
                status: 'Method Not Allowed',
                title: `Method ${req.method.toUpperCase()} Not Allowed`,
                source: {
                    pointer: req.url
                }
            }]
        });
    }
}
