import axios from "axios";
import { getQueryFromArrayOfObject } from "../searchQueryOfArray";
import { getApiConfig } from "./apiConfig";
import { handleApiError } from "../utils/apiErrorHandler";

// search keyword fuel station api function
export const searchKeywordFuelStationV3 = async ({
  perPage = 20,
  page = 1,
  search_key = "",
  active_option_ids = [],
  start_lat = "",
  end_lat = "",
  start_long = "",
  end_long = "",
  time = "",
  lat = "",
  long = "",
  distance = "",
}) => {
  return await axios
    .get(
      `v3.0/client/fuel-station/${perPage}?search_key=${search_key}&page=${page}${getQueryFromArrayOfObject(
        active_option_ids,
        "active_option_ids[]"
      )}&start_lat=${start_lat}&end_lat=${end_lat}&start_long=${start_long}&end_long=${end_long}&time=${time}&lat=${lat}&long=${long}&distance=${distance}`,
      getApiConfig()
    )
    .then((res) => {
      return res?.data?.data;
    })
    .catch((err) => {
      handleApiError(err);
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
      handleApiError(err);
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
      handleApiError(err);
    });
};

// get All fuel service api function
export const getAllFuelServices = async (id) => {
  return await axios
    .get(`/v1.0/client/fuel-station-services/get/all`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleApiError(err);
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
      handleApiError(err);
    });
};
