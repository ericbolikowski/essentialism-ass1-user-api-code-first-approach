import { ResponseDto } from "./response.dto.abstract";

export class OkResponseDto<T> extends ResponseDto {
  public readonly success = true;
  public readonly error = undefined;
  constructor(httpStatusCode: number, readonly data: T) {
    super(httpStatusCode);
  }
}
