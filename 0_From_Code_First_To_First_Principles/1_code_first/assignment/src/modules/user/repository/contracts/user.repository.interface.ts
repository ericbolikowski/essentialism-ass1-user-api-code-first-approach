import { Result } from "../../../../libs/utils/result";
import { UserEntity } from "../../entities/user.entity";

export type UserRepositoryCreateUserError =
  | "EMAIL_ALREADY_EXISTS"
  | "USERNAME_ALREADY_EXISTS"
  | "GENERIC";
export type UserRepositoryGetUserError = "USER_NOT_FOUND" | "GENERIC";
export type UserRepositoryEditUserError = "GENERIC";

/**
 * Interface for the User Repository, which defines methods for interacting with user data.
 */
export interface IUserRepository {
  /**
   * Creates a new user in the database.
   * @param user - The user entity to create.
   * @returns A Promise that resolves to a Result containing the created user entity or an error.
   */
  createUser(
    user: UserEntity
  ): Promise<Result<UserEntity, UserRepositoryCreateUserError>>;

  /**
   * Retrieves a user from the database by their email address.
   * @param email - The email address of the user to retrieve.
   * @returns A Promise that resolves to a Result containing the retrieved user entity or an error.
   */
  getUserByEmail(
    email: string
  ): Promise<Result<UserEntity, UserRepositoryGetUserError>>;

  /**
   * Retrieves a user from the database by their ID.
   * @param id - The ID of the user to retrieve.
   * @returns A Promise that resolves to a Result containing the retrieved user entity or an error.
   */
  getUserById(
    id: number
  ): Promise<Result<UserEntity, UserRepositoryGetUserError>>;

  /**
   * Updates an existing user in the database.
   * @param user - The updated user entity.
   * @returns A Promise that resolves to a Result containing the updated user entity or an error.
   */
  editUser(
    user: UserEntity
  ): Promise<Result<UserEntity, UserRepositoryEditUserError>>;
}
