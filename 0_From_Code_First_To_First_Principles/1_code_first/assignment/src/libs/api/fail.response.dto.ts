import { ResponseDto } from "./response.dto.abstract";

export class FailResponseDto extends ResponseDto {
  public readonly success = false;
  public readonly data = undefined;
  constructor(httpStatusCode: number, readonly error: string) {
    super(httpStatusCode);
  }
}
