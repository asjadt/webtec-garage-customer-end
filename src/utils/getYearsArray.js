import moment from "moment";

export function lastFourYears(fromDate, nth) {
  const currentYear = moment().year();
  const yearsArray = [];

  const fromYear = moment(fromDate, "DD-MM-YYYY").year();

  for (let i = 0; i < nth; i++) {
    if (fromYear <= currentYear - i) {
      yearsArray.push({ id: i + 1, label: currentYear - i + "" });
    }
  }

  return yearsArray;
}
