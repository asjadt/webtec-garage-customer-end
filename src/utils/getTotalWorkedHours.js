export const getTotalWorkedHours = (arrayOfTimes) => {
  const arrayOfTimesInMs = arrayOfTimes.map((item) => ({
    id: item.id,
    inTimeInMs: item.in_time ? convertTimeToMs(item.in_time) : 0,
    outTimeInMs: item.out_time ? convertTimeToMs(item.out_time) : 0,
  }));
  const totalTimeSpentMs = arrayOfTimesInMs.reduce(
    (acc, curr) => acc + (curr.outTimeInMs - curr.inTimeInMs),
    0
  );
  //   const totalHoursSpent = totalTimeSpentMs / 3600000;

  const totalHours = Math.floor(totalTimeSpentMs / 3600000);
  const remainingMinutes = Math.floor((totalTimeSpentMs % 3600000) / 60000);
  const remainingSeconds = Math.floor((totalTimeSpentMs % 60000) / 1000);

  return {
    Hours: totalHours,
    Minutes: remainingMinutes,
    Seconds: remainingSeconds,
  };
};

// Helper functions to convert time formats
function convertTimeToMs(time) {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600000 + minutes * 60000 + seconds * 1000;
}
