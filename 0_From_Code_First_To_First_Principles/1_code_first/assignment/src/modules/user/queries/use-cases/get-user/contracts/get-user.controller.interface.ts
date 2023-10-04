import { FailResponseDto } from "../../../../../../libs/api/fail.response.dto";
import { IController } from "../../../../../../libs/ddd/controller.interface";
import { GetUserRequestDto } from "./get-user.request-dto";
import { GetUserResponseDto } from "./get-user.response-dto";

export interface IGetUserController
  extends IController<
    GetUserRequestDto,
    GetUserResponseDto | FailResponseDto
  > {}
