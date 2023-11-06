export function fizzbuzz(n: number) {
  const isFizz = n % 3 === 0
  const isBuzz = n % 5 === 0
  if (isFizz && isBuzz) return "FizzBuzz"
  if (isFizz) return "Fizz"
  if (isBuzz) return "Buzz"
}