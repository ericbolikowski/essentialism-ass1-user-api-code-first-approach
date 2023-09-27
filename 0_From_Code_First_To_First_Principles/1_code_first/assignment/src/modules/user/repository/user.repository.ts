import { Result } from "../../../libs/utils/result";
import { UserEntity } from "../entities/user.entity";
import {
  IUserRepository,
  UserRepositoryError,
} from "./user.repository.interface";
import { MikroORM, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { errorToString } from "../../../libs/utils/error-to-string";

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

    return new UserRepository(orm);
  }

  public async createUser(
    user: UserEntity
  ): Promise<Result<UserEntity, UserRepositoryError>> {
    try {
      const em = this.orm.em.fork();
      await em.persistAndFlush(user);
      return Result.ok(user);
    } catch (err: any) {
      const errorAsString = errorToString(err);
      let errorType: UserRepositoryError = "GENERIC";

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

      return Result.fail(errorAsString, errorType);
    }
  }
}
