import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GlobalModule } from './shared/global.module';
import { UserModule } from './user/user.module';


@Module({
    imports: [
        GlobalModule,
        MongooseModule.forRoot('mongodb://localhost:27017/nestjs-project', {
            useNewUrlParser: true,
            useFindAndModify: false
        }),
        UserModule
    ]
})
export class AppModule {
}
