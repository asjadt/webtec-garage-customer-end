import axios from "axios";
import { getApiConfig } from "./apiConfig";

// get ratting question api function
export const getRatingQuestion = async (id) => {
  return await axios
    .get(
      `client/review-new/get/questions-all?garage_id=${id}`,
      axios.defaults.headers.common["Authorization"]
        ? axios.defaults.headers.common["Authorization"]
        : getApiConfig()
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
// post client booking ratting api function
export const postClientRatting = async (id, data) => {
  return await axios
    .post(
      `review-new/${id}`,
      data,
      axios.defaults.headers.common["Authorization"]
        ? axios.defaults.headers.common["Authorization"]
        : getApiConfig()
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
