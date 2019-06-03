import {
    All, Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, MethodNotAllowedException, Patch, Post, Query,
    Req, UseGuards, UseInterceptors
} from '@nestjs/common';

import { Request } from 'express';

import { CreateUserDto } from "./dto/create-user.dto";
import { ParamValidationPipe } from './pipes/param-validation.pipe';
import { ReadUserDto } from "./dto/read-user.dto";
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from "./user.entity";
import { UserService } from './user.service';
import { JwtGuard } from '../jwt/jwt.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post()
    async createUser(@Body(new ParamValidationPipe()) createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUserDto);
    }

    @Get()
    @UseGuards(JwtGuard)
    async readUser(@Query(new ParamValidationPipe()) readUserDto: ReadUserDto, @Req() req: Request): Promise<UserEntity> {
        return this.userService.readUser(readUserDto);
    }

    @Patch()
    @UseGuards(JwtGuard)
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
