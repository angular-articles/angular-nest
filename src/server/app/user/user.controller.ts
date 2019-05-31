import {
    All, Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, MethodNotAllowedException, Patch, Post, Query,
    Req, UseInterceptors
} from '@nestjs/common';

import { Request } from 'express';

import { CreateUserDto } from "./dto/create-user.dto";
import { DataInterceptor } from "../shared/interceptors/data.interceptor";
import { ErrorInterceptor } from "../shared/interceptors/error.interceptor";
import { ParamValidationPipe } from './pipes/param-validation.pipe';
import { ReadUserDto } from "./dto/read-user.dto";
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from "./user.entity";
import { UserService } from './user.service';


@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(DataInterceptor)
@UseInterceptors(ErrorInterceptor)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post()
    async createUser(@Body(new ParamValidationPipe()) createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUserDto);
    }

    @Get()
    async readUser(@Query(new ParamValidationPipe()) readUserDto: ReadUserDto, @Req() req: Request): Promise<UserEntity> {
        return this.userService.readUser(readUserDto);
    }

    @Patch()
    async updateUser(@Body(new ParamValidationPipe()) updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return this.userService.updateUser(updateUserDto);
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
