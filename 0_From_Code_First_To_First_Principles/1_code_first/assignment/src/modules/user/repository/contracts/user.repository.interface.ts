import { Result } from "../../../../libs/utils/result";
import { UserEntity } from "../../entities/user.entity";

export type UserRepositoryCreateUserError =
  | "EMAIL_ALREADY_EXISTS"
  | "USERNAME_ALREADY_EXISTS"
  | "GENERIC";
export type UserRepositoryGetUserError = "USER_NOT_FOUND" | "GENERIC";
export type UserRepositoryEditUserError = "GENERIC";

export interface IUserRepository {
  createUser(
    user: UserEntity
  ): Promise<Result<UserEntity, UserRepositoryCreateUserError>>;
  getUserByEmail(
    email: string
  ): Promise<Result<UserEntity, UserRepositoryGetUserError>>;
  getUserById(
    id: number
  ): Promise<Result<UserEntity, UserRepositoryGetUserError>>;
  editUser(
    user: UserEntity
  ): Promise<Result<UserEntity, UserRepositoryEditUserError>>;
}
