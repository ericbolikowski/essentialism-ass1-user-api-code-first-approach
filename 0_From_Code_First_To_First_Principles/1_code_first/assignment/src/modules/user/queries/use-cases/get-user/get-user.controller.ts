import { plainToClass } from "class-transformer";
import { IGetUserController } from "./contracts/get-user.controller.interface";
import { IGetUserUseCase } from "./contracts/get-user.use-case.interface";
import { GetUserRequestDto } from "./contracts/get-user.request-dto";
import { FailResponseDto } from "../../../../../libs/api/fail.response.dto";
import { validate } from "class-validator";
import { GetUserQuery } from "./contracts/get-user.query";
import { GetUserUseCase } from "./get-user.use-case";
import { GetUserResponseDto } from "./contracts/get-user.response-dto";

export class GetUserController implements IGetUserController {
  constructor(private readonly useCase: IGetUserUseCase) {}

  async invoke(message: any) {
    const dto = plainToClass(GetUserRequestDto, message, {});
    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      // The spec for this assignment asks for a very simple error where we drop a lot of
      // detailed information returned from class-validaotr that could have been useful to
      // the user. We could consider returning that information. For now, we'll just log
      // it out.
      console.error("GetUser request failed with these validation errors:");
      console.log(errors);
      return new FailResponseDto(400, "ValidationError");
    }

    const query = this.buildGetUserQuery(dto);
    const result = await this.useCase.execute(query);

    if (result.isFailure) {
      return this.handleGetUserFailure(result);
    }

    return this.buildGetUserResponse(result);
  }

  private buildGetUserQuery(dto: GetUserRequestDto): GetUserQuery {
    const query = new GetUserQuery();
    query.email = dto.email;
    return query;
  }

  private handleGetUserFailure(result: GetUserUseCaseResult): FailResponseDto {
    switch (result.errorType()) {
      case "USER_NOT_FOUND":
        return new FailResponseDto(404, "UserNotFound");
      default:
        return new FailResponseDto(500, "OtherError");
    }
  }

  private buildGetUserResponse(result: GetUserUseCaseResult) {
    const user = result.getValue();

    return new GetUserResponseDto(200, {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }
}

// Some Typescript magic to get the return type of the Promise returned by
// GetUserUseCase's execute method.
type GetUserUseCaseResult = Awaited<ReturnType<GetUserUseCase["execute"]>>;
