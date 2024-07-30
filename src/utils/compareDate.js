import moment from "moment";


export const compareDate = (date1, date2) => {
    const momentDate1 = moment(date1, "DD-MM-YYYY");
    const momentDate2 = moment(date2, "DD-MM-YYYY");

    if (momentDate1.isBefore(momentDate2)) {
        return momentDate1.format("DD-MM-YYYY");
    } else {
        return momentDate2.format("DD-MM-YYYY");
    }
}