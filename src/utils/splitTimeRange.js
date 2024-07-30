import moment from "moment";

export const splitTimeRange = (timeRange, interval) => {
  // TIME RANGE
  const startTime = moment(timeRange.start_at, "HH:mm:ss");
  const endTime = moment(timeRange.end_at, "HH:mm:ss");

  //   INTERVAL
  const intervalStart = moment(interval.start_at, "HH:mm:ss");
  const intervalEnd = moment(interval.end_at, "HH:mm:ss");

  const result = [];

  if (
    intervalStart.isBetween(startTime, endTime) &&
    intervalEnd.isBetween(startTime, endTime)
  ) {
    result.push(
      {
        start_at: startTime.format("HH:mm:ss"),
        end_at: intervalStart.format("HH:mm:ss"),
      },
      {
        start_at: intervalEnd.format("HH:mm:ss"),
        end_at: endTime.format("HH:mm:ss"),
      }
    );
  } else {
    result.push(timeRange);
  }

  return result;
};
