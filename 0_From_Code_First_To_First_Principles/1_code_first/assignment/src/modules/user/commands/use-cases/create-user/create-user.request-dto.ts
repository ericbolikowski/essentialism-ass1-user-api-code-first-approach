import { IsEmail, Length, MinLength } from "class-validator";
import { UserEntity } from "../../../entities/user.entity";
import { IRequestDto } from "../../../../../libs/api/request.dto.interface";

export class CreateUserRequestDto
  implements
    IRequestDto,
    Pick<UserEntity, "email" | "username" | "firstName" | "lastName">
{
  @IsEmail()
  email: string;

  @Length(5, 100)
  username: string;

  @MinLength(3)
  firstName: string;

  @MinLength(3)
  lastName: string;
}
