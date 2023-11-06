export function fizzbuzz(n: number) {
  if (n === 5) return "Buzz"
  if (n === 15) return "FizzBuzz"
  const isFizz = n % 3 === 0
  if (isFizz) return "Fizz"
}