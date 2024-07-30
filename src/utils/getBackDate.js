export function getBackDate(years) {
  const today = new Date();
  const backDate = new Date(
    today.getFullYear() - years,
    today.getMonth(),
    today.getDate()
  );

  return backDate;
}
