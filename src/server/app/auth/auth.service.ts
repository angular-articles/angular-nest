import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';

import { compare } from 'bcrypt';

import { ErrorMongoHelper } from '../shared/interceptors/error-mongo.helper';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { SignInDto } from './dto/sign-in.dto';
import { UnauthorizedException } from '../shared/classes';
import { UserEntity } from '../user/user.entity';
import { UserModel } from '../shared/interfaces/user.interface';


@Injectable()
export class AuthService {
    constructor(@InjectModel('Users') private readonly userModel: Model<UserModel>, private jwtService: JwtService) {
    }

    async signIn(signInDto: SignInDto): Promise<UserEntity> {
        const user = await this.userModel.findOne({email: signInDto.email});

        if (!user) {
            throw new BadRequestException(ErrorMongoHelper('user not found by email'));
        }

        const success = await compare(signInDto.password, user.password);

        if (success) {
            const payload: SignInDto = {email: signInDto.email};
            const accessToken = this.jwtService.sign(payload);

            return new UserEntity({
                ...user.toObject(),
                token: accessToken
            });
        } else {
            throw new UnauthorizedException({
                errors: [{
                    code: HttpStatus.UNAUTHORIZED,
                    status: 'Unauthorized',
                    title: 'Wrong password',
                    source: {
                        parameter: 'password'
                    }
                }]
            });
        }
    }
}
