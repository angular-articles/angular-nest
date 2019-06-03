import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { hash } from 'bcrypt';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { ErrorMongoHelper } from "../shared/interceptors/error-mongo.helper";
import { ReadUserDto } from "./dto/read-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from './user.entity';
import { UserModel } from '../shared/interfaces/user.interface';
import { BadRequestException } from '../shared/classes';


@Injectable()
export class UserService {
    constructor(@InjectModel('Users') private readonly userModel: Model<UserModel>, private jwtService: JwtService) {
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userWithHashedPassword = {...createUserDto};

        userWithHashedPassword.password = await hash(createUserDto.password, 10);

        const user = await new this.userModel(userWithHashedPassword).save();

        return new UserEntity({...user.toObject(), token: this.jwtService.sign({email: user.toObject().email})});
    }

    async readUser(readUserDto: ReadUserDto): Promise<UserEntity> {
        const user = await this.userModel.findOne({email: readUserDto.email});

        if (!user) {
            throw new BadRequestException(ErrorMongoHelper('user not found by email'));
        }

        return new UserEntity(user.toObject());
    }

    async updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const transformedUser = {...updateUserDto};

        if (transformedUser.password) {
            transformedUser.password = await hash(transformedUser.password, 10)
        }

        const user = await this.userModel.findOneAndUpdate({_id: transformedUser._id}, transformedUser, {new: true});

        if (!user) {
            throw new BadRequestException(ErrorMongoHelper('user not found by id'));
        }

        return new UserEntity(user.toObject());
    }
}
