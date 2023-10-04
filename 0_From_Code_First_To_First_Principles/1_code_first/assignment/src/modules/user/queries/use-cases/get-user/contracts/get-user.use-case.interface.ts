import { IUseCase } from "../../../../../../libs/ddd/use-case.interface";
import { UserEntity } from "../../../../entities/user.entity";
import { UserRepositoryGetUserError } from "../../../../repository/contracts/user.repository.interface";
import { GetUserQuery } from "./get-user.query";

export type GetUserUseCaseError = UserRepositoryGetUserError;

export interface IGetUserUseCase
  extends IUseCase<GetUserQuery, UserEntity, GetUserUseCaseError> {}
