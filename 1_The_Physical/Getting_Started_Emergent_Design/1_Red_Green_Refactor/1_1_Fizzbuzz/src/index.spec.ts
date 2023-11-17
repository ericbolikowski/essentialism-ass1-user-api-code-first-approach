import { fizzbuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {
  it.each([3, 9, 42])(
    "should return 'Fizz' given a multiple of 3, such as %p",
    (n: number) => expect(fizzbuzz(n)).toBe("Fizz")
  );

  it.each([5, 20, 50, 100])(
    "should return 'Buzz' given a multiple of 5, such as %p",
    (n: number) => {
      expect(fizzbuzz(n)).toBe("Buzz");
    }
  );

  it.each([15, 45, 90])(
    "should return 'FizzBuzz' given a multiple of both 3 and 5, such as %p",
    (n: number) => {
      expect(fizzbuzz(n)).toBe("FizzBuzz");
    }
  );

  it("should return the string '43' given the number 43", () => {
    expect(fizzbuzz(43)).toBe("43");
  });

  it.each([-12, 102])(
    "should throw an error given an out-of-[1,100]-range value, such as %p",
    (n: number) => {
      expect(() => fizzbuzz(n)).toThrowError(
        "Number must be between 1 and 100"
      );
    }
  );

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
  ])("should throw an error given any non-number, such as %p", (n: any) => {
    expect(() => fizzbuzz(n)).toThrowError();
  });

  it.each([5, 100])(
    "should always return a string value given valid input, such as %p",
    (n: number) => {
      expect(typeof fizzbuzz(n)).toBe("string");
    }
  );
});
