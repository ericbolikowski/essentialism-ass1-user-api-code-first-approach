import { IUseCase } from "../../../../../libs/ddd/use-case.interface";
import { Log } from "../../../../../libs/log/log";
import { Result } from "../../../../../libs/utils/result";
import { UserEntity } from "../../../entities/user.entity";
import { IUserRepository } from "../../../repository/contracts/user.repository.interface";
import { EditUserCommand } from "./contracts/edit-user.command";
import {
  EditUserUseCaseError,
  IEditUserUseCase,
} from "./contracts/edit-user.use-case-interface";

export class EditUserUseCase implements IEditUserUseCase {
  constructor(
    private readonly buildRepository: () => Promise<IUserRepository>
  ) {}

  @Log({
    startMessage: "Running EditUser use case with input:",
    logInputValues: true,
    endMessage: "Done, result:",
    logReturnValue: true,
  })
  async execute(
    command: EditUserCommand
  ): Promise<Result<UserEntity, EditUserUseCaseError>> {
    const repository = await this.buildRepository();

    const result = (await repository.getUserById(command.id)).pipe(
      async (user) => {
        user.email = command.email;
        user.username = command.username;
        user.firstName = command.firstName;
        user.lastName = command.lastName;

        return repository.editUser(user);
      }
      // TODO: ugly - fix this. I'd rather want automatic TS inference
      // here to correctly find out what the return value of the final
      // function in the pipe chain is.
    ) as unknown as UserRepositoryEditUserReturnValue;

    return result;
  }
}

type UserRepositoryEditUserReturnValue = Awaited<
  ReturnType<IUserRepository["editUser"]>
>;
