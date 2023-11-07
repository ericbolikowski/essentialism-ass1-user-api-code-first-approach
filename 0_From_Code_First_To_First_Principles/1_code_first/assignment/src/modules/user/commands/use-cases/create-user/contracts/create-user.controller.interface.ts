import { FailResponseDto } from "../../../../../../libs/api/fail.response.dto";
import { IController } from "../../../../../../libs/ddd/controller.interface";
import { CreateUserRequestDto } from "./create-user.request-dto";
import { CreateUserResponseDto } from "./create-user.response-dto";

export interface ICreateUserController
  extends IController<
    CreateUserRequestDto,
    CreateUserResponseDto | FailResponseDto
  > {}
