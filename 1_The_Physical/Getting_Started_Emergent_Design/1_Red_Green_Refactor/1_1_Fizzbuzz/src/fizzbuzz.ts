export function fizzbuzz(n: number) {
  if (!isNumber(n)) throw new Error("fizzbuzz: parameter must be a number");
  if (n < 1 || n > 100)
    throw new Error("fizzbuzz: number must be between 1 and 100");
  const isFizz = n % 3 === 0;
  const isBuzz = n % 5 === 0;
  if (isFizz && isBuzz) return "FizzBuzz";
  if (isFizz) return "Fizz";
  if (isBuzz) return "Buzz";
  return n.toString();
}

function isNumber(n: any): n is number {
  return typeof n === "number" && !isNaN(n);
}
