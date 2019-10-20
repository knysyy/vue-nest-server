import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export default class RegisterUserDto {
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;

  @Length(8, 32)
  @IsNotEmpty()
  readonly password: string;
}
