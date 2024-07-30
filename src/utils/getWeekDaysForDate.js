import moment from "moment";

function getWeekdaysForDate(selectedDate, restrictedDates) {
  const result = [];
  const date = moment(selectedDate, "DD-MM-YYYY");

  // Find the first day (Monday) of the week
  const firstDayOfWeek = moment(date).startOf("isoWeek");

  // Iterate through the weekdays (Monday to Friday)
  for (let i = 0; i < 5; i++) {
    const currentDay = moment(firstDayOfWeek).add(i, "days");
    const formattedDay = currentDay.format("DD-MM-YYYY");

    // Check if the formatted day is not in the restrictedDates array
    if (!restrictedDates.includes(formattedDay)) {
      result.push(formattedDay);
    }
  }

  return result;
}

// Example usage:
const selectedDate = "12-02-2024"; // Replace with your selected date
const weekdays = getWeekdaysForDate(selectedDate);
console.log(weekdays);
