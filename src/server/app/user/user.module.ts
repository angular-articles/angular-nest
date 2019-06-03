import { Module } from '@nestjs/common';

import { JwtStrategy } from '../jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
    ],
    controllers: [
        UserController
    ],
    providers: [
        JwtStrategy,
        UserService
    ],
    exports: [
        PassportModule
    ]
})
export class UserModule {
}
