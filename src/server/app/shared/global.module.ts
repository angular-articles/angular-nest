import { CreateUserSchema } from './schemas/user.schema';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';


@Global()
@Module({
    imports: [
        JwtModule.register({
            privateKey: 'secretKey',
            signOptions: {
                expiresIn: 60
            }
        }),
        MongooseModule.forFeature([
            {name: 'Users', schema: CreateUserSchema}
        ])
    ]
})
export class GlobalModule {
}
