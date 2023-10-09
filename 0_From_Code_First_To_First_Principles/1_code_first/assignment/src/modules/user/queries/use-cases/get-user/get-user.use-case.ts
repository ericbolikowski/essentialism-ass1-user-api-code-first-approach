import { Log } from "../../../../../libs/log/log";
import { IUserRepository } from "../../../repository/contracts/user.repository.interface";
import { GetUserQuery } from "./contracts/get-user.query";
import { IGetUserUseCase } from "./contracts/get-user.use-case.interface";

export class GetUserUseCase implements IGetUserUseCase {
  constructor(
    private readonly buildRepository: () => Promise<IUserRepository>
  ) {}

  @Log({
    startMessage: "Running GetUser use case with input:",
    logInputValues: true,
    endMessage: "Done, result:",
    logReturnValue: true,
  })
  async execute(message: GetUserQuery) {
    const repository = await this.buildRepository();
    const result = await repository.getUserByEmail(message.email);
    return result;
  }
}
