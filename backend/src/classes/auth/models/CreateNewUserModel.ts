import {
  IsAlpha, IsEmail, IsString, MaxLength, MinLength,
} from 'class-validator';

export default class CreateNewUserModel {
  @MinLength(3)
  @IsString()
  @IsAlpha()
    firstName: string;

  @MinLength(3)
  @IsString()
  @IsAlpha()	
    lastName: string;

  @IsString()
  @IsEmail()
    email: string;

  @MinLength(8)
  @MaxLength(40)
  @IsString()
    password: string;

  constructor(firstName: string, lastName: string, email: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
