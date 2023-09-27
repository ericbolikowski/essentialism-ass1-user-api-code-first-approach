import { IRequestDto } from "../api/request.dto.interface";
import { ResponseDto } from "../api/response.dto.abstract";

export interface IController<
  Input extends IRequestDto,
  Output extends ResponseDto
> {
  invoke(message: any): Promise<Output>;
}
