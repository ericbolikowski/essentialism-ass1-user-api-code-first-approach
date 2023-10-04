import {
  IsAlphanumeric,
  IsEmail,
  Length,
  MinLength,
  isAlphanumeric,
} from "class-validator";
import { IRequestDto } from "../../../../../../libs/api/request.dto.interface";
import { UserEntity } from "../../../../entities/user.entity";

export class CreateUserRequestDto
  implements
    IRequestDto,
    Pick<UserEntity, "email" | "username" | "firstName" | "lastName">
{
  @IsEmail()
  email: string;

  @Length(5, 100)
  @IsAlphanumeric()
  username: string;

  @MinLength(3)
  firstName: string;

  @MinLength(3)
  lastName: string;
}
