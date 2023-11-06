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
});
