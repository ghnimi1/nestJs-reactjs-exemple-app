/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, isNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  fullName: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  age: string;
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  password:string
}
