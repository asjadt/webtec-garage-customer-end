export function generateObjectId() {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  const counter = Math.floor(Math.random() * 16777215).toString(16);

  // Ensure the counter has a fixed length
  const objectId = timestamp + counter.padStart(10, "0");

  return objectId;
}
