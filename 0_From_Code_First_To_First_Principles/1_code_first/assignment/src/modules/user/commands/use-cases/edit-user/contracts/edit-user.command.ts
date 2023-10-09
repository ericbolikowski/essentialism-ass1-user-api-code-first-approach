import { ICommand } from "../../../../../../libs/ddd/command.interface";
import { UserEntity } from "../../../../entities/user.entity";

export class EditUserCommand
  implements
    ICommand,
    Pick<UserEntity, "id" | "email" | "username" | "firstName" | "lastName">
{
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}
