import axios from "axios";
import { getQueryFromArrayOfObject } from "../searchQueryOfArray";
import { getApiConfig } from "./apiConfig";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// get garage list api function
export const saveToLocalStorage = async (
  perPage = 12,
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
  wifi_available = false,
  is_mobile_garage = false,
  page = 1,
  date_time = ""
) => {
  const searchingData = {
    perPage: perPage !== undefined ? perPage : 12,
    search_key: search_key !== undefined ? search_key : "",
    country_code: country_code !== undefined ? country_code : "",
    address: address !== undefined ? address : "",
    city: city !== undefined ? city : "",
    service_ids: service_ids !== undefined ? service_ids : [],
    sub_service_ids: sub_service_ids !== undefined ? sub_service_ids : [],
    make_ids: make_ids !== undefined ? make_ids : [],
    model_ids: model_ids !== undefined ? model_ids : [],
    start_lat: start_lat !== undefined ? `${start_lat}` : "",
    end_lat: end_lat !== undefined ? `${end_lat}` : "",
    start_long: start_long !== undefined ? `${start_long}` : "",
    end_long: end_long !== undefined ? `${end_long}` : "",
    wifi_available: wifi_available !== undefined ? wifi_available : 0,
    is_mobile_garage: is_mobile_garage !== undefined ? is_mobile_garage : 0,
    page: page !== undefined ? page : 1,
    date_time: date_time,
  };

  localStorage.setItem("search_data", JSON.stringify(searchingData));
};
// get garage list api function
export const getGarages = async ({
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
      `v1.0/client/garages/${perPage}?search_key=${search_key}${getQueryFromArrayOfObject(
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

export const getAllGarages = async ({
  address = "",
  city = "",
  country_code = "",

  end_lat = "",
  end_long = "",
  is_mobile_garage = false,
  make_ids = [],
  model_ids = [],
  page = 1,
  perPage = 12,
  search_key = "",
  service_ids = [],
  start_lat = "",
  start_long = "",
  sub_service_ids = [],
  wifi_available = false,
  date_time = "",
}) => {
  const searchingData = {
    perPage: perPage !== undefined ? perPage : 12,
    search_key: search_key !== undefined ? search_key : "",
    country_code: country_code !== undefined ? country_code : "",
    address: address !== undefined ? address : "",
    city: city !== undefined ? city : "",
    service_ids: service_ids !== undefined ? service_ids : [],
    sub_service_ids: sub_service_ids !== undefined ? sub_service_ids : [],
    make_ids:
      make_ids !== undefined
        ? make_ids?.length > 1
          ? [make_ids[0]]
          : make_ids
        : [],
    model_ids: model_ids !== undefined ? model_ids : [],
    start_lat: start_lat !== undefined ? `${start_lat}` : "",
    end_lat: end_lat !== undefined ? `${end_lat}` : "",
    start_long: start_long !== undefined ? `${start_long}` : "",
    end_long: end_long !== undefined ? `${end_long}` : "",
    wifi_available: wifi_available !== undefined ? wifi_available : "",
    is_mobile_garage: is_mobile_garage !== undefined ? is_mobile_garage : "",
    date_time: date_time !== undefined ? date_time : "",
    page: page !== undefined ? page : 1,
  };

  localStorage.setItem("search_data", JSON.stringify(searchingData));

  const addressCondition =
    (city === undefined || city === "undefined") &&
    (country_code === undefined || country_code === "undefined");
  return await axios
    .get(
      `v1.0/client/garages/${perPage}?search_key=${search_key}${getQueryFromArrayOfObject(
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
      }&open_time=${date_time}&page=${page}`,
      getApiConfig()
    )
    .then((res) => {
      return res.data;
    });
};

// single garage api function
export const getSingleGarage = async (id) => {
  return await axios
    .get(`v1.0/client/garages/single/${id}`, getApiConfig())
    .then((res) => {
      return res.data;
    });
};

// garage review api function
export const getSingleGarageReview = async (id) => {
  return await axios
    .get(`review-new/getreviewAll/${id}`, getApiConfig())
    .then((res) => {
      return res.data;
    });
};

// garage details api function
export const getGarageDetails = async (id) => {
  return await axios
    .get(`v1.0/client/garages/service-model-details/${id}`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// package details api function
export const getPackageDetails = async (id) => {
  return await axios
    .get(`v1.0/garage-packages/get/all/${id}`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getGarageTimingDetails = async (id) => {
  return await axios
    .get(`v1.0/garage-times/${id}`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

//  coupon validation api function
export const getCoupnValidation = async (id, cpuponId, price) => {
  return await axios
    .get(
      `/v1.0/client/coupons/get-discount/${id}/${
        cpuponId ? cpuponId : null
      }/${price}`,
      getApiConfig()
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getAllCoupn = async (id) => {
  return await axios
    .get(`/v1.0/client/coupons/by-garage-id/${id}/10000000`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getAllAutoApplyCoupn = async (id) => {
  return await axios
    .get(`/v1.0/client/coupons/all-auto-applied-coupons/${id}`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// garage list api function without search
export const getAllGaragesWithoutSearch = async ({
  perPage = 20,
  page = 1,
}) => {
  return await axios
    .get(`v1.0/client/garages/${perPage}&page=${page}`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// get service api function

export const getServices = async () => {
  return await axios
    .get(`v1.0/services-all/1`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// get make api function

export const getMakes = async () => {
  return await axios
    .get(`v1.0/automobile-makes-all/1`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// get garage model api function
export const getGarageModels = async (garage_id, make_id) => {
  return await axios
    .get(
      `v1.0/client/garages/garage-automobile-models/${garage_id}/${make_id}`,
      getApiConfig()
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// get sub services api function
export const getSubServices = async (ids) => {
  return await axios
    .get(`v1.0/sub-services-all?service_ids[]=${ids}`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// get sub service without ids api function
export const getSubServicesWithoutIds = async () => {
  return await axios
    .get(`v1.0/sub-services-all`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// get model api function
export const getModels = async (ids) => {
  return await axios
    .get(
      `v1.0/automobile-models-all?automobile_make_ids[]=${ids}`,
      getApiConfig()
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
// get model without ids api function
export const getModelsWithoutIds = async () => {
  return await axios
    .get(`v1.0/automobile-models-all`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// post booking details api function
export const postBookingDetails = async (details) => {
  return await axios
    .post(`v1.0/client/bookings`, details)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// post pre booking details api function
export const postPackageBookingDetails = async (id, packageid, details) => {
  return await axios
    .post(`v1.0/client/bookings`, details, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// post pre booking details api function
export const postPreBookingDetails = async (details) => {
  return await axios
    .post(`v1.0/client/pre-bookings`, details, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// get garage gallery api function
export const getGarageGallery = async (id) => {
  return await axios
    .get(`v1.0/client/garage-galleries/${id}`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getGarageCombinedData = async () => {
  return await axios
    .get(`/v1.0/service-make-model-combined`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const uploadPreBookingImages = async (data) => {
  return await axios
    .post(`v1.0/client/pre-bookings-image-multiple`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
