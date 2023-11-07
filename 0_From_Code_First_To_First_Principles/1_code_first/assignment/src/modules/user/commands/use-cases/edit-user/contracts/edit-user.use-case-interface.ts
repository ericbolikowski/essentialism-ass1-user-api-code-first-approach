import { IUseCase } from "../../../../../../libs/ddd/use-case.interface";
import { UserEntity } from "../../../../entities/user.entity";
import { UserRepositoryEditUserError } from "../../../../repository/contracts/user.repository.interface";
import { EditUserCommand } from "./edit-user.command";

export type EditUserUseCaseError = UserRepositoryEditUserError;

export interface IEditUserUseCase
  extends IUseCase<EditUserCommand, UserEntity, EditUserUseCaseError> {}
