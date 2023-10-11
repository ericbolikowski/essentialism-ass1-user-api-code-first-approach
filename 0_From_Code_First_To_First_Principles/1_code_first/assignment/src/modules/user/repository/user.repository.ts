import { MikroORM, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { errorToString } from "../../../libs/utils/error-to-string";
import { Result } from "../../../libs/utils/result";
import { UserEntity } from "../entities/user.entity";
import {
  IUserRepository,
  UserRepositoryCreateUserError,
  UserRepositoryEditUserError,
  UserRepositoryGetUserError,
} from "./contracts/user.repository.interface";

export class UserRepository implements IUserRepository {
  private constructor(private readonly orm: MikroORM) {}

  public static async build(): Promise<UserRepository> {
    // I want this to use the config from the config file ("../../config/mikro-orm.config"),
    // but it's not working for some reason... mysterious TS errors
    const orm = await MikroORM.init<PostgreSqlDriver>({
      entities: ["./dist/src/modules/user/entities/"],
      entitiesTs: ["./src/modules/user/entities/"],
      type: "postgresql",
      clientUrl: process.env.DATABASE_URL,
    });
    await orm.getMigrator().up();

    return new UserRepository(orm);
  }

  public async createUser(
    user: UserEntity
  ): Promise<Result<UserEntity, UserRepositoryCreateUserError>> {
    try {
      const em = this.orm.em.fork();
      await em.persistAndFlush(user);
      return Result.ok(user);
    } catch (err: any) {
      return this.onWriteUserBuildFailResult(err);
    }
  }

  public async getUserById(
    id: number
  ): Promise<Result<UserEntity, UserRepositoryGetUserError>> {
    try {
      const em = this.orm.em.fork();
      const user = await em.findOne(UserEntity, { id });

      if (!user) {
        return Result.fail("User not found", "USER_NOT_FOUND");
      }

      return Result.ok(user);
    } catch (err: any) {
      const errorAsString = errorToString(err);
      return Result.fail(errorAsString, "GENERIC");
    }
  }

  public async getUserByEmail(
    email: string
  ): Promise<Result<UserEntity, UserRepositoryGetUserError>> {
    try {
      const em = this.orm.em.fork();
      const user = await em.findOne(UserEntity, { email });

      if (!user) {
        return Result.fail("User not found", "USER_NOT_FOUND");
      }

      return Result.ok(user);
    } catch (err: any) {
      const errorAsString = errorToString(err);
      return Result.fail(errorAsString, "GENERIC");
    }
  }

  public async editUser(
    user: UserEntity
  ): Promise<Result<UserEntity, UserRepositoryEditUserError>> {
    try {
      const em = this.orm.em.fork();
      await em.persistAndFlush(user);
      return Result.ok(user);
    } catch (err: any) {
      return this.onWriteUserBuildFailResult(err);
    }
  }

  private onWriteUserBuildFailResult(err: any) {
    const errorAsString = errorToString(err);
    let errorType: UserRepositoryCreateUserError = "GENERIC";

    if (
      err?.name === "UniqueConstraintViolationException" &&
      err?.constraint === "users_email_unique"
    ) {
      errorType = "EMAIL_ALREADY_EXISTS";
    } else if (
      err?.name === "UniqueConstraintViolationException" &&
      err?.constraint === "users_username_unique"
    ) {
      errorType = "USERNAME_ALREADY_EXISTS";
    }

    return Result.fail<
      UserEntity,
      UserRepositoryCreateUserError & UserRepositoryEditUserError
    >(errorAsString, errorType);
  }
}
