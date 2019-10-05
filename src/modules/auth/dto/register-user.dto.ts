import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from "class-validator";

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 32)
  readonly password: string;
}
