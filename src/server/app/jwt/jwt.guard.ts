import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import { UnauthorizedException } from '../shared/classes';


@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    static handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new UnauthorizedException({
                errors: [{
                    code: HttpStatus.UNAUTHORIZED,
                    status: 'Unauthorized',
                    title: info.message
                }]
            });
        }

        return user;
    }
}
