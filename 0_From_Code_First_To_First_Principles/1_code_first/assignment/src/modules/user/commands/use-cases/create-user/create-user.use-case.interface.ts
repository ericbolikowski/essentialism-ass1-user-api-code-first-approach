import { IUseCase } from "../../../../../libs/ddd/use-case.interface";
import { UserEntity } from "../../../entities/user.entity";
import { UserRepositoryError } from "../../../repository/user.repository.interface";
import { CreateUserCommand } from "./create-user.command";

export type CreateUserUseCaseError = UserRepositoryError;

export interface ICreateUserUseCase
  extends IUseCase<CreateUserCommand, UserEntity, CreateUserUseCaseError> {}
