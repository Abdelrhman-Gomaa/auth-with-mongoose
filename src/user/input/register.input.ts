import {
    IsNotEmpty,
    MaxLength,
    IsEmail,
    IsMobilePhone,
    MinLength,
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterInput {

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(30)
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(30)
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(30)
    userName: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    notVerifiedEmail: string;

    @ApiProperty()
    @IsMobilePhone(null, null, { message: 'Invalid Phone Number' })
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nation: string;

    @ApiProperty()
    @MinLength(6)
    @MaxLength(30)
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    birthDay: number;

}
