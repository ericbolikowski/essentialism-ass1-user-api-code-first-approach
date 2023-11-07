import { errorToString } from "./error-to-string";

function isPromise<SuccessType>(value: any): value is Promise<SuccessType> {
  return !!value && typeof value.then === "function";
}

// Source: https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/
// + iterations thanks to ChatGPT and experiments

export class Result<SuccessType, ErrorType = any> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error?: string;
  private _errorType?: ErrorType;
  protected _value?: SuccessType;

  protected constructor(
    isSuccess: boolean,
    error?: string,
    errorType?: ErrorType,
    value?: SuccessType
  ) {
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
    this._errorType = errorType;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): SuccessType {
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

  public errorType(): ErrorType {
    return this._errorType!;
  }

  public static ok<SuccessType, ErrorType = any>(
    value?: SuccessType
  ): Result<SuccessType> {
    return new Result<SuccessType>(true, undefined, undefined, value);
  }

  public static fail<SuccessType, ErrorType = any>(
    error: string,
    errorType?: ErrorType
  ): Result<SuccessType, ErrorType> {
    return new Result<SuccessType, ErrorType>(false, error, errorType);
  }

  public async pipe<U>(
    ...functions: Array<
      | ((input: SuccessType) => U) // synchroneous function
      | ((input: SuccessType) => Promise<U>) // asynchroneous function
      | ((input: SuccessType) => Result<U>) // synchroneous function that returns a Result
      | ((input: SuccessType) => Promise<Result<U>>) // asynchroneous function that returns a Result
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
        current = Result.fail(errorToString(err), err);
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
        return Result.fail(errorToString(err), err);
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
