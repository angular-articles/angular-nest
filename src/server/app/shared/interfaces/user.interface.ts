import { Document } from 'mongoose';


export class User {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly confirmPassword: string;
    readonly token?: string;

    constructor(args) {
        return {
            ...args && {firstName: args.firstName},
            ...args && {lastName: args.lastName},
            ...args && {email: args.email},
            ...args && {password: args.password},
            ...args && {confirmPassword: args.confirmPassword},
            ...args && {token: args.token},
            ...args && {_id: args._id.toString()}
        };
    }
}

export interface UserModel extends User, Document {
}
