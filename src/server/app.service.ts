import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    message = 'Hello World!';

    getHello(): string {
        return this.message;
    }
}
