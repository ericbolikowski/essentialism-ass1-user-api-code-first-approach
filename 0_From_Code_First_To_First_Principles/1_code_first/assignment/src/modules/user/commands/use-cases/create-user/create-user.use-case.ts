import { IUseCase } from "../../../../../libs/ddd/use-case.interface";
import { Result } from "../../../../../libs/utils/result";
import { UserEntity } from "../../../entities/user.entity";
import { generateRandomPassword } from "../../../helpers/generate-random-password";
import {
  IUserRepository,
  UserRepositoryError,
} from "../../../repository/contracts/user.repository.interface";
import { CreateUserCommand } from "./contracts/create-user.command";
import { ICreateUserUseCase } from "./contracts/create-user.use-case.interface";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async execute(message: CreateUserCommand) {
    const user = new UserEntity();
    user.email = message.email;
    user.username = message.username;
    user.firstName = message.firstName;
    user.lastName = message.lastName;
    user.password = generateRandomPassword();

    const result = await this.repository.createUser(user);

    return result;
  }
}
