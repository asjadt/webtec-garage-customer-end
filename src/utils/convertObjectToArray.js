// CONVERT OBJ TO ARRAY HELPER FUNCTION
export function convertObjectToArray(inputObject) {
  const resultArray = [];

  for (const key in inputObject) {
    if (Object.hasOwnProperty.call(inputObject, key)) {
      const categoryData = inputObject[key];
      resultArray.push(categoryData);
    }
  }

  return resultArray;
}
