export const getQueryFromArrayOfObject = (array, queryParam) => {
  let query = ``;
  if (array === "" || array === undefined) {
    const ar = [];
    ar?.map((el) => {
      query += `&${queryParam}=${el}`;
    });
  } else {
    array?.map((el) => {
      query += `&${queryParam}=${el}`;
    });
  }
  return query;
};
