import {
  IsAlphanumeric,
  IsEmail,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
  MinLength,
  isString,
} from "class-validator";
import { IRequestDto } from "../../../../../../libs/api/request.dto.interface";
import { UserEntity } from "../../../../entities/user.entity";
import { Transform } from "class-transformer";

export class EditUserRequestDto
  implements
    IRequestDto,
    Pick<UserEntity, "id" | "email" | "username" | "firstName" | "lastName">
{
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsNumber()
  id: number;

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
