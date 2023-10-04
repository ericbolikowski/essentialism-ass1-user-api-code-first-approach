import { Log } from "../../../../../libs/log/log";
import { UserEntity } from "../../../entities/user.entity";
import { generateRandomPassword } from "../../../helpers/generate-random-password";
import { IUserRepository } from "../../../repository/contracts/user.repository.interface";
import { CreateUserCommand } from "./contracts/create-user.command";
import { ICreateUserUseCase } from "./contracts/create-user.use-case.interface";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly buildRepository: () => Promise<IUserRepository>
  ) {}

  @Log({
    startMessage: "Running CreateUser with input:",
    logInputValues: true,
    endMessage: "Done, result:",
    logReturnValue: true,
  })
  async execute(message: CreateUserCommand) {
    const user = new UserEntity();
    user.email = message.email;
    user.username = message.username;
    user.firstName = message.firstName;
    user.lastName = message.lastName;
    user.password = generateRandomPassword();

    const repository = await this.buildRepository();
    const result = await repository.createUser(user);

    return result;
  }
}
