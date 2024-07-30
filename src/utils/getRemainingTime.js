export function getRemainingTime({ startAt, endAt, arrayOfTimes }) {
  // Convert all times to milliseconds for easier calculations

  const startTimeInMs = convertTimeToMs(startAt);
  const endTimeInMs = convertTimeToMs(endAt);
  const arrayOfTimesInMs = arrayOfTimes.map((item) => ({
    id: item.id,
    inTimeInMs: convertTimeToMs(item.in_time),
    outTimeInMs: convertTimeToMs(item.out_time),
  }));

  // Calculate total time spent in arrayOfTimes
  const totalTimeSpentMs = arrayOfTimesInMs.reduce(
    (acc, curr) => acc + (curr.outTimeInMs - curr.inTimeInMs),
    0
  );

  // Calculate remaining time (endAt - startTime - totalTimeSpent)
  let remainingTimeInMs = endTimeInMs - startTimeInMs - totalTimeSpentMs;

  // Ensure remaining time is not negative (handles cases where totalTimeSpent exceeds available time)
  remainingTimeInMs = Math.max(remainingTimeInMs, 0);

  // Get remaining_from from the last element's out_time
  const remainingFrom =
    arrayOfTimesInMs[arrayOfTimesInMs.length - 1].outTimeInMs;

  // Convert remaining time back to HH:MM:SS format
  const remainingTo = convertMsToTime(remainingTimeInMs + remainingFrom);

  return {
    remaining_from: convertMsToTime(remainingFrom),
    remaining_to: remainingTo,
  };
}

function convertTimeToMs(time) {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600000 + minutes * 60000 + seconds * 1000;
}

function convertMsToTime(ms) {
  const hours = Math.floor(ms / 3600000)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((ms % 3600000) / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
