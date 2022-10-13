import {
  IsEmail, IsString,
} from 'class-validator';

export default class LoginUserModel {
  @IsString()
  @IsEmail()
    email: string;

  @IsString()
    password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
