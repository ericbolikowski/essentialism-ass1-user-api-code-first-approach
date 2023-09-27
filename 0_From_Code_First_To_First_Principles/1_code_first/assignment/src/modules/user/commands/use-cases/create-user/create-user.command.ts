import { ICommand } from "../../../../../libs/ddd/command.interface";
import { UserEntity } from "../../../entities/user.entity";

export interface CreateUserCommand
  extends ICommand,
    Pick<UserEntity, "email" | "username" | "firstName" | "lastName"> {}
