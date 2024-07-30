export function formatNumberWithCommas(number) {
  // Convert the number to a string with commas
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
