export function isArraysAreEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  const sortedArray1 = array1.slice().sort();
  const sortedArray2 = array2.slice().sort();
  for (let i = 0; i < sortedArray1.length; i++) {
    if (sortedArray1[i] !== sortedArray2[i]) {
      return false;
    }
  }
  return true;
}
