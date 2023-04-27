import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class PhoneNumberAndPasswordLoginInput {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(30)
  @IsNotEmpty()
  password: string;
}
