import axios from "axios";
import { getApiConfig } from "./apiConfig";
import { handleApiError } from "../utils/apiErrorHandler";
import { getQueryFromArrayOfObject } from "../searchQueryOfArray";

// GET
// =============================================
export const getGaragesV2 = async ({
  perPage = 20,
  search_key = "",
  country_code = "",
  address = "",
  city = "",
  service_ids = [],
  sub_service_ids = [],
  make_ids = [],
  model_ids = [],
  start_lat = "",
  end_lat = "",
  start_long = "",
  end_long = "",
  wifi_available = "",
  is_mobile_garage = "",
  page = 1,
  date_time = "",
}) => {
  const addressCondition =
    (city === undefined || city === "undefined") &&
    (country_code === undefined || country_code === "undefined");
  return await axios
    .get(
      `v2.0/client/garages/${perPage}?search_key=${search_key}${getQueryFromArrayOfObject(
        service_ids,
        "service_ids[]"
      )}${getQueryFromArrayOfObject(
        sub_service_ids,
        "sub_service_ids[]"
      )}${getQueryFromArrayOfObject(
        make_ids,
        "automobile_make_ids[]"
      )}${getQueryFromArrayOfObject(
        model_ids,
        "automobile_model_ids[]"
      )}&wifi_available=${wifi_available}&is_mobile_garage=${is_mobile_garage}&address=${
        city !== "undefined" && city !== undefined
          ? city
          : country_code
          ? country_code
          : ""
      }&address_line_1=${
        addressCondition ? address : ""
      }&open_time=${date_time}&page=${page}&start_lat=${start_lat}&end_lat=${end_lat}&start_long=${start_long}&end_long=${end_long}`,
      getApiConfig()
    )
    .then((res) => {
      return res.data;
    });
};

export const getSingleGarage = async (id) => {
  console.log(id);
  return await axios
    .get(`v1.0/client/garages/single/${id}`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleApiError(error);
    });
};
