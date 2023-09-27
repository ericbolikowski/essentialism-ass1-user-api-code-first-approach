import { Result } from "../utils/result";
import { ICommand } from "./command.interface";
import { IQuery } from "./query.interface";

export interface IUseCase<
  Input extends IQuery | ICommand,
  SuccessOutput,
  FailOutput
> {
  execute(message: Input): Promise<Result<SuccessOutput, FailOutput>>;
}
