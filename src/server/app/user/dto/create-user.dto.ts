import { Contains, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @Length(6)
    @IsNotEmpty()
    readonly password: string;

    @Contains(this.password)
    @IsNotEmpty()
    readonly confirmPassword: string;

    @Length(3)
    @IsNotEmpty()
    readonly firstName: string;

    @Length(3)
    @IsNotEmpty()
    readonly lastName: string;
}
