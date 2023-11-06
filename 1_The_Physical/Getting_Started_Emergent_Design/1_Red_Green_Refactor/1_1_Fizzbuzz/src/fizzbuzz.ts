export function fizzbuzz(n: number) {
  if (n > 100) throw new Error("Number must be between 1 and 100")
  const isFizz = n % 3 === 0
  const isBuzz = n % 5 === 0
  if (isFizz && isBuzz) return "FizzBuzz"
  if (isFizz) return "Fizz"
  if (isBuzz) return "Buzz"
  return n.toString()
}