export function formatNumber(number: number) {
  console.log(number);
  const numStr = number.toString();
  const decimalIndex = numStr.length - 3;
  return numStr.slice(0, decimalIndex) + "." + numStr.slice(decimalIndex);
}