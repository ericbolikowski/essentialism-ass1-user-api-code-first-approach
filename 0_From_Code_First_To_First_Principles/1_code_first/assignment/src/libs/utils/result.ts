import { errorToString } from "./error-to-string";

function isPromise<T>(value: any): value is Promise<T> {
  return !!value && typeof value.then === "function";
}

// Source: https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/
// + iterations thanks to ChatGPT and experiments

export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error?: string;
  protected _value?: T;

  protected constructor(isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        "InvalidOperation: A result cannot be successful and contain an error"
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        "InvalidOperation: A failing result needs to contain an error message"
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead."
      );
    }

    return this._value!;
  }

  public errorValue(): string {
    return this.error!;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public async pipe<U>(
    ...functions: Array<
      | ((input: T) => U) // synchroneous function
      | ((input: T) => Promise<U>) // asynchroneous function
      | ((input: T) => Result<U>) // synchroneous function that returns a Result
      | ((input: T) => Promise<Result<U>>) // asynchroneous function that returns a Result
    >
  ): Promise<Result<U>> {
    let current: Result<any> = this;

    for (const fn of functions) {
      if (current.isFailure) {
        return current;
      }
      const value = current.getValue();

      let nextValue;
      try {
        const potentialValue = fn(value);

        if (isPromise(potentialValue)) {
          nextValue = await potentialValue;
        } else {
          nextValue = potentialValue;
        }

        if (nextValue instanceof Result) {
          current = nextValue;
        } else {
          current = Result.ok(nextValue);
        }
      } catch (err) {
        current = Result.fail(err instanceof Error ? err.message : String(err));
      }
    }

    return current;
  }
}

export class ResultAsync {
  public static fromPromiseToResultPromise<T>(
    promise: () => Promise<T> | Promise<T>
  ) {
    return async () => {
      try {
        let result;
        if (isPromise(promise)) {
          result = await promise;
        } else {
          result = await promise();
        }
        return Result.ok(result);
      } catch (err) {
        return Result.fail(errorToString(err));
      }
    };
  }

  public static fromFunctionToResultPromise<T>(
    fn: () => T
  ): () => Promise<Result<T>> {
    return async () => {
      try {
        const result = fn();
        return Result.ok(result);
      } catch (err) {
        return Result.fail(errorToString(err));
      }
    };
  }
}
