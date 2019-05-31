import { Exclude, Expose } from 'class-transformer';

import { User } from '../shared/interfaces/user.interface';


@Exclude()
export class UserEntity {
    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    email: string;

    @Expose()
    _id: string;

    @Expose()
    token?: string;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, new User(partial));
    }
}
