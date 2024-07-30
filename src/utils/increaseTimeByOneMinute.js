export function increaseTimeByOneMinute(timeStr) {
  let [hours, minutes, seconds] = timeStr.split(":").map(Number);
  minutes += 1;

  if (minutes >= 60) {
    minutes = 0;
    hours += 1;
  }
  if (hours >= 24) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}
