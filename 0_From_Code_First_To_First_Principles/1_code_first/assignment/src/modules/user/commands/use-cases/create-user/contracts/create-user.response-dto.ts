import { OkResponseDto } from "../../../../../../libs/api/ok.response.dto";
import { UserEntity } from "../../../../entities/user.entity";

interface DtoUserProps
  extends Pick<
    UserEntity,
    "id" | "email" | "username" | "firstName" | "lastName"
  > {}

export class CreateUserResponseDto extends OkResponseDto<DtoUserProps> {}
