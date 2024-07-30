import moment from "moment";
export const useTimeCalculations = (data) => {
  let prevClockTotalSeconds = 0;
  let totalInThisClocksSeconds = 0;
  const now = moment();

  data?.attendance_records?.forEach((record) => {
    const inTime = moment(record?.in_time, "HH:mm:ss");
    const outTime = record?.out_time
      ? moment(record?.out_time, "HH:mm:ss")
      : inTime;

    if (inTime.isSame(outTime)) {
      totalInThisClocksSeconds = now?.diff(inTime, "seconds");
    } else {
      prevClockTotalSeconds += outTime?.diff(inTime, "seconds");
    }
  });

  const scheduleStart = moment(data?.schedule_start_at, "HH:mm:ss");
  const scheduleEnd = moment(data?.schedule_end_at, "HH:mm:ss");

  const scheduledTotalSeconds = scheduleEnd?.diff(scheduleStart, "seconds");

  const inTotal = prevClockTotalSeconds + totalInThisClocksSeconds;

  const remainingSeconds = scheduledTotalSeconds - inTotal;
  const overtimeSeconds =
    scheduledTotalSeconds - inTotal < 0 ? Math.abs(remainingSeconds) : 0;

  const formatTime = (seconds) => {
    return moment.utc(seconds * 1000).format("HH:mm:ss");
  };

  return {
    todaysTotal: formatTime(prevClockTotalSeconds + totalInThisClocksSeconds),
    totalInThisClocks: formatTime(totalInThisClocksSeconds),
    totalRemaining: formatTime(Math.max(0, remainingSeconds)),
    totalOverTime: formatTime(overtimeSeconds),
    nowTime: moment().format("lll"),
  };
};
