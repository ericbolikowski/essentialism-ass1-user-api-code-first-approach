import { Result } from "@libs/api/result.abstract";
import { Command } from "./command.base";
import { Query } from "./query.base";

export abstract class UseCase<Input extends Query | Command, Output> {
  abstract execute(message: Input): Promise<Result<Output>>;
}
