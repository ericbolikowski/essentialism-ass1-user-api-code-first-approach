import { IsEmail, IsNumberString } from "class-validator";
import { IRequestDto } from "../../../../../../libs/api/request.dto.interface";
import { UserEntity } from "../../../../entities/user.entity";
import { Transform } from "class-transformer";

export class GetUserRequestDto
  implements IRequestDto, Pick<UserEntity, "email">
{
  @IsEmail()
  email: string;
}
