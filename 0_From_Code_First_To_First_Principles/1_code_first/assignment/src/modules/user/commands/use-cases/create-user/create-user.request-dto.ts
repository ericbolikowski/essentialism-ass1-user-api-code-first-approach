import { IsEmail, Length, MinLength } from "class-validator";

export class CreateUserRequestDto {
  @IsEmail()
  email: string;

  @Length(5, 100)
  username: string;

  @MinLength(3)
  firstName: string;

  @MinLength(3)
  lastName: string;
}
