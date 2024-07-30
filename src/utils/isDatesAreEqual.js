import moment from "moment";

export const isDatesAreEqual = (dateString1, dateString2) => {
  // Check if any date string is empty, null, or undefined
  if (!dateString1 || !dateString2) {
    return false;
  }

  // Parse the dates into Moment objects
  var date1 = moment(dateString1, "D-MM-YYYY");
  var date2 = moment(dateString2, "D-MM-YYYY");

  // Check if both dates are valid
  if (!date1.isValid() || !date2.isValid()) {
    return false;
  }

  // Compare the dates and return the result
  return date1.isSame(date2);
};
