import { APP_INTERCEPTOR } from "@nestjs/core";
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { DataInterceptor } from "./shared/interceptors/data.interceptor";
import { ErrorInterceptor } from "./shared/interceptors/error.interceptor";
import { GlobalModule } from './shared/global.module';
import { UserModule } from './user/user.module';


@Module({
    imports: [
        GlobalModule,
        MongooseModule.forRoot('mongodb://localhost:27017/nestjs-project', {
            useNewUrlParser: true,
            useFindAndModify: false
        }),
        UserModule,
        AuthModule
    ],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: DataInterceptor,
    }, {
        provide: APP_INTERCEPTOR,
        useClass: ErrorInterceptor,
    }]
})
export class AppModule {
}
