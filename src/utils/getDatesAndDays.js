import moment from "moment";

export function getDatesAndDays(startDate) {
  const today = moment();
  const startMoment = moment(startDate, "DD-MM-YYYY");
  const nextSunday = startMoment.clone().endOf("week").add(1, "day");

  // If the given date is Sunday, return only that date and day
  if (startMoment.day() === 0) {
    return [
      {
        date: startMoment.format("DD-MM-YYYY"),
        day: startMoment.format("dddd"),
      },
    ];
  }

  const datesAndDays = [];

  // Iterate from the given date to the next Sunday (inclusive) or until today
  let currentMoment = startMoment.clone();
  while (
    currentMoment.isSameOrBefore(nextSunday, "day") &&
    currentMoment.isSameOrBefore(today, "day")
  ) {
    datesAndDays.push({
      date: currentMoment.format("DD-MM-YYYY"),
      day: currentMoment.format("dddd"),
    });
    currentMoment.add(1, "day");
  }

  return datesAndDays;
}
