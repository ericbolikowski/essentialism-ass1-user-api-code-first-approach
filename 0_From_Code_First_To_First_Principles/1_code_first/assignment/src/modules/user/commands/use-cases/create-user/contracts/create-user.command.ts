import { ICommand } from "../../../../../../libs/ddd/command.interface";
import { UserEntity } from "../../../../entities/user.entity";

export class CreateUserCommand
  implements
    ICommand,
    Pick<UserEntity, "email" | "username" | "firstName" | "lastName">
{
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}
