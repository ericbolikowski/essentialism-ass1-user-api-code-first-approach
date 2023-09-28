import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { FailResponseDto } from "../../../../../libs/api/fail.response.dto";
import { ICreateUserController } from "./contracts/create-user.controller.interface";
import { CreateUserRequestDto } from "./contracts/create-user.request-dto";
import { CreateUserResponseDto } from "./contracts/create-user.response-dto";
import { ICreateUserUseCase } from "./contracts/create-user.use-case.interface";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly useCase: ICreateUserUseCase) {}

  async invoke(message: any) {
    const dto = plainToClass(CreateUserRequestDto, message, {});
    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      // The spec for this assignment asks for a very simple error where we drop a lot of
      // detailed information returned from class-validaotr that could have been useful to
      // the user. We could consider returning that information. For now, we'll just log
      // it out.
      console.error("CreateUser request failed with these validation errors:");
      console.log(errors);
      return new FailResponseDto(400, "ValidationError");
    }

    const command = new CreateUserRequestDto();
    command.email = dto.email;
    command.username = dto.username;
    command.firstName = dto.firstName;
    command.lastName = dto.lastName;

    const result = await this.useCase.execute(command);

    if (result.isFailure) {
      if (result.errorType() === "EMAIL_ALREADY_EXISTS") {
        return new FailResponseDto(409, "EmailAlreadyInUse");
      } else if (result.errorType() === "USERNAME_ALREADY_EXISTS") {
        return new FailResponseDto(409, "UsernameAlreadyTaken");
      } else {
        return new FailResponseDto(500, "OtherError");
      }
    }

    const user = result.getValue();

    return new CreateUserResponseDto(201, {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }
}
