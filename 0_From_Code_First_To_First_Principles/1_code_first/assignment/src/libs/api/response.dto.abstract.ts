export abstract class ResponseDto {
  constructor(public readonly httpStatusCode: number) {}
  public readonly data: any;
  public readonly error: any;
  readonly success: boolean;
}
