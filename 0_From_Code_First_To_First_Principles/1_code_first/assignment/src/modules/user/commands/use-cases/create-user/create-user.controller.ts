import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { FailResponseDto } from "../../../../../libs/api/fail.response.dto";
import { ICreateUserController } from "./contracts/create-user.controller.interface";
import { CreateUserRequestDto } from "./contracts/create-user.request-dto";
import { CreateUserResponseDto } from "./contracts/create-user.response-dto";
import { ICreateUserUseCase } from "./contracts/create-user.use-case.interface";
import { CreateUserCommand } from "./contracts/create-user.command";
import { CreateUserUseCase } from "./create-user.use-case";

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

    const command = this.buildCreateUserCommand(dto);
    const result = await this.useCase.execute(command);

    if (result.isFailure) {
      return this.handleCreateUserFailure(result);
    }

    return this.buildCreateUserResponse(result);
  }

  private buildCreateUserCommand(dto: CreateUserRequestDto): CreateUserCommand {
    const command = new CreateUserCommand();
    command.email = dto.email;
    command.username = dto.username;
    command.firstName = dto.firstName;
    command.lastName = dto.lastName;
    return command;
  }

  private handleCreateUserFailure(
    result: CreateUserUseCaseResult
  ): FailResponseDto {
    switch (result.errorType()) {
      case "EMAIL_ALREADY_EXISTS":
        return new FailResponseDto(409, "EmailAlreadyInUse");
      case "USERNAME_ALREADY_EXISTS":
        return new FailResponseDto(409, "UsernameAlreadyTaken");
      default:
        return new FailResponseDto(500, "OtherError");
    }
  }

  private buildCreateUserResponse(
    result: CreateUserUseCaseResult
  ): CreateUserResponseDto {
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

// Some Typescript magic to get the return type of the Promise returned by
// CreateUserUseCase's execute method.
type CreateUserUseCaseResult = Awaited<
  ReturnType<CreateUserUseCase["execute"]>
>;
