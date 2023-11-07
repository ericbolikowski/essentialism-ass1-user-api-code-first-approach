import { Result } from "../../../../libs/utils/result";
import { UserEntity } from "../../entities/user.entity";

export type UserRepositoryError =
  | "EMAIL_ALREADY_EXISTS"
  | "USERNAME_ALREADY_EXISTS"
  | "GENERIC";
export interface IUserRepository {
  createUser(
    user: UserEntity
  ): Promise<Result<UserEntity, UserRepositoryError>>;
}
