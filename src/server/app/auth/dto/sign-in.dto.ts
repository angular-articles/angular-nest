import { IsEmail, IsNotEmpty, Length } from 'class-validator';


export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @Length(6, 255)
    readonly password?: string;
}
