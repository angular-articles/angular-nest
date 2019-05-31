import { IsEmail, IsMongoId, IsNotEmpty, Length } from 'class-validator';
import { ObjectId } from 'mongodb';


export class UpdateUserDto {
    @IsMongoId()
    @IsNotEmpty()
    readonly _id: ObjectId;

    @Length(3, 255)
    readonly firstName?: string;

    @Length(3, 255)
    readonly lastName?: string;

    @IsEmail()
    readonly email?: string;

    @Length(6, 255)
    readonly password?: string;
}
