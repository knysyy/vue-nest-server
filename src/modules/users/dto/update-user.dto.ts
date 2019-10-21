import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export default class UpdateUserDto {
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;
}
