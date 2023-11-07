export function Log(options: {
  startMessage?: string;
  logInputValues?: boolean;
  endMessage?: string;
  logReturnValue?: boolean;
}) {
  return function (
    target: Object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (options.startMessage) console.log(options.startMessage);
      if (options.logInputValues) console.log(...args);

      const result = originalMethod.apply(this, args);

      if (result instanceof Promise) {
        result.then((returnValue) => {
          if (options.endMessage) console.log(options.endMessage);
          if (options.logReturnValue) console.log(returnValue);
        });
      } else {
        if (options.endMessage) console.log(options.endMessage);
        if (options.logReturnValue) console.log(result);
      }

      return result;
    };

    return descriptor;
  };
}
