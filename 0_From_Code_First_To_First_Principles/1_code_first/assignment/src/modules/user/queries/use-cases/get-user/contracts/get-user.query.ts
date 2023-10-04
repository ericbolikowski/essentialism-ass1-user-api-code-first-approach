import { IQuery } from "../../../../../../libs/ddd/query.interface";
import { UserEntity } from "../../../../entities/user.entity";

export class GetUserQuery implements IQuery, Pick<UserEntity, "email"> {
  email: string;
}
