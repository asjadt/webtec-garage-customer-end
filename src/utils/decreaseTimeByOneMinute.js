export function decreaseTimeByOneMinute(timeStr) {
  let [hours, minutes, seconds] = timeStr.split(":").map(Number);
  minutes -= 1;

  if (minutes < 0) {
    minutes = 59;
    hours -= 1;
  }
  if (hours < 0) {
    hours = 23;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}
