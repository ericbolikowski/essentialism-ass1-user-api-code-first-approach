import { plainToClass } from "class-transformer";
import { IEditUserController } from "./contracts/edit-user.controller.interface";
import { IEditUserUseCase } from "./contracts/edit-user.use-case-interface";
import { EditUserRequestDto } from "./contracts/edit-user.request-dto";
import { validate } from "class-validator";
import { FailResponseDto } from "../../../../../libs/api/fail.response.dto";
import { EditUserCommand } from "./contracts/edit-user.command";
import { EditUserUseCase } from "./edit-user.use-case";
import { EditUserResponseDto } from "./contracts/edit-user.response-dto";

export class EditUserController implements IEditUserController {
  constructor(private readonly useCase: IEditUserUseCase) {}

  async invoke(message: any) {
    const dto = plainToClass(EditUserRequestDto, message, {});
    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      // The spec for this assignment asks for a very simple error where we drop a lot of
      // detailed information returned from class-validaotr that could have been useful to
      // the user. We could consider returning that information. For now, we'll just log
      // it out.
      console.error("EditUser request failed with these validation errors:");
      console.log(errors);
      return new FailResponseDto(400, "ValidationError");
    }

    const command = this.buildEditUserCommand(dto);
    const result = await this.useCase.execute(command);

    if (result.isFailure) {
      return this.handleEditUserFailure(result);
    }

    return this.buildEditUserResponse(result);
  }

  private buildEditUserCommand(dto: EditUserRequestDto): EditUserCommand {
    const command = new EditUserCommand();
    command.id = dto.id;
    command.email = dto.email;
    command.username = dto.username;
    command.firstName = dto.firstName;
    command.lastName = dto.lastName;
    return command;
  }

  private handleEditUserFailure(
    result: EditUserUseCaseResult
  ): FailResponseDto {
    return new FailResponseDto(500, "OtherError");
  }

  private buildEditUserResponse(result: EditUserUseCaseResult) {
    const user = result.getValue();
    return new EditUserResponseDto(200, {
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
type EditUserUseCaseResult = Awaited<ReturnType<EditUserUseCase["execute"]>>;
