import { fizzbuzz } from "./fizzbuzz"

describe("fizzbuzz", () => {
  it("should return Fizz given 3", () => {
    expect(fizzbuzz(3)).toBe("Fizz")
  })
  
  it ("should return Buzz given 5", () => {
    expect(fizzbuzz(5)).toBe("Buzz")
  })

  it("should return FizzBuzz given 15", () => {
    expect(fizzbuzz(15)).toBe("FizzBuzz")
  })

  it("should return Fizz given 9", () => {
    expect(fizzbuzz(9)).toBe("Fizz")
  })

  it ("should return Fizz given 42", () => {
    expect(fizzbuzz(42)).toBe("Fizz")
  })

  it ("should return FizzBuzz given 45", () => {
    expect(fizzbuzz(45)).toBe("FizzBuzz")
  })

  it ("should return '43' given 43", () => {
    expect(fizzbuzz(43)).toBe("43")
  })

  it ("should throw an error given 102", () => {
    expect(() => fizzbuzz(102)).toThrowError("Number must be between 1 and 100")
  })

  it ("should throw an error given -12", () => {
    expect(() => fizzbuzz(-12)).toThrowError("Number must be between 1 and 100")
  })

  it ("should throw an error given any non-number, such as string", () => {
    expect(() => fizzbuzz("hello" as any)).toThrowError()
  })

  it("should throw an error given any non-number, such as true", () => {
    expect(() => fizzbuzz(true as any)).toThrowError()
  })    

  it("should throw an error given any non-number, such as object", () => {
    expect(() => fizzbuzz({} as any)).toThrowError()
  })

  it("should throw an error given any non-number, such as null", () => {
    expect(() => fizzbuzz(null as any)).toThrowError()
  })

  it("should throw an error given any non-number, such as undefined", () => {
    expect(() => fizzbuzz(undefined as any)).toThrowError()
  })

  it("should throw an error given any non-number, such as NaN", () => {
    expect(() => fizzbuzz(NaN as any)).toThrowError()
  })

  it("should throw an error given any non-number, such as Infinity", () => {
    expect(() => fizzbuzz(Infinity as any)).toThrowError()
  })

  it("should throw an error given any non-number, such as -Infinity", () => {
    expect(() => fizzbuzz(-Infinity as any)).toThrowError()
  })

  it("should throw an error given any non-number, such as Symbol", () => {
    expect(() => fizzbuzz(Symbol() as any)).toThrowError()
  })

  it("should throw an error given any non-number, such as function", () => {
    expect(() => fizzbuzz((() => {}) as any)).toThrowError()
  })

  it("should throw an error given any non-number, such as array", () => {
    expect(() => fizzbuzz([] as any)).toThrowError()
  })

  it("should always return a string value given valid input, such as 5", () => {
    expect(typeof fizzbuzz(5)).toBe("string")
  })
});
