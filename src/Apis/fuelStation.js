import axios from "axios";
import { getQueryFromArrayOfObject } from "../searchQueryOfArray";
import { getApiConfig } from "./apiConfig";

// search keyword fuel station api function
export const searchKeywordFuelStation = async ({
  perPage = 12,
  page = 1,
  search_key = "",

  address_line_1 = "",
  country = "",
  city = "",

  active_option_ids = [],
  start_lat = "",
  end_lat = "",
  start_long = "",
  end_long = "",
  time = "",
}) => {
  const addressCondition =
    (city === undefined || city === "undefined") &&
    (country === undefined || country === "undefined");
  return await axios
    .get(
      `v1.0/client/fuel-station/${perPage}?search_key=${search_key}&country=${
        country !== undefined ? country : ""
      }&page=${page}${getQueryFromArrayOfObject(
        active_option_ids,
        "active_option_ids[]"
      )}&city=${
        city !== undefined && city !== "undefined" ? city : ""
      }&start_lat=${start_lat}&end_lat=${end_lat}&start_long=${start_long}&end_long=${end_long}&address=${
        city !== "undefined" && city !== undefined
          ? city
          : country
          ? country
          : ""
      }&address_line_1=${addressCondition ? address_line_1 : ""}&time=${time}`,
      getApiConfig()
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// get fuel service api function
export const getFuelServices = async () => {
  return await axios
    .get(`v1.0/client/fuel-station-services/get/all`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// get single fuel service api function
export const getSingleFuelServices = async (id) => {
  return await axios
    .get(`v1.0/client/fuel-station/get/single/${id}`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// get fuel galaries api function
export const getFuelGellaries = async (id) => {
  return await axios
    .get(`v1.0/client/fuel-stations-galleries/${id}`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
