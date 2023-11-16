import { fizzbuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
  it.each([3, 9, 42])("returns Fizz given %p", (n: number) =>
    expect(fizzbuzz(n)).toBe("Fizz")
  );

  it.each([5])("should return Buzz given %p", (n: number) => {
    expect(fizzbuzz(n)).toBe("Buzz");
  });

  it.each([15, 45])("return FizzBuzz given %p", (n: number) => {
    expect(fizzbuzz(n)).toBe("FizzBuzz");
  });

  it.each([43])("should return '%p' given %p", (n: number) => {
    expect(fizzbuzz(n)).toBe("43");
  });

  it.each([-12, 102])("should throw an error given %p", (n: number) => {
    expect(() => fizzbuzz(n)).toThrowError("Number must be between 1 and 100");
  });

  it.each([
    "hello",
    true,
    {},
    null,
    undefined,
    NaN,
    Infinity,
    -Infinity,
    Symbol(),
    () => {},
    [],
  ])("should throw an error given %p", (n: any) => {
    expect(() => fizzbuzz(n)).toThrowError();
  });

  it.each([5, 100])(
    "should always return a string value given valid input, such as %p",
    (n: number) => {
      expect(typeof fizzbuzz(n)).toBe("string");
    }
  );
});
