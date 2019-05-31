import { IsEmail, IsNotEmpty } from 'class-validator';


export class ReadUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
}
