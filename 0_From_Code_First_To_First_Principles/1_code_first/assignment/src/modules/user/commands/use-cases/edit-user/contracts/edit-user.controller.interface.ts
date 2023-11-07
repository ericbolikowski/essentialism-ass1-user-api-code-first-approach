import { FailResponseDto } from "../../../../../../libs/api/fail.response.dto";
import { IController } from "../../../../../../libs/ddd/controller.interface";
import { EditUserRequestDto } from "./edit-user.request-dto";
import { EditUserResponseDto } from "./edit-user.response-dto";

export interface IEditUserController
  extends IController<
    EditUserRequestDto,
    EditUserResponseDto | FailResponseDto
  > {}
