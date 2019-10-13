import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export default class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  readonly email: string;
}