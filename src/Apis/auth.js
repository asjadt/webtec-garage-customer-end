import axios from "axios";
import { getApiConfig } from "./apiConfig";

// login api function
export const loginUser = async (details) => {
  return await axios
    .post(`v1.0/login`, details, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// signup api function
export const signUpUser = async (details) => {
  return await axios
    .post(`v1.0/register`, details, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// update user api function
export const updateUser = async (details) => {
  return await axios
    .put(`v1.0/update-user-info`, details, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// get user api function
export const getUser = async () => {
  return await axios
    .get(`v1.0/user`, getApiConfig())
    .then((res) => {
      // axios.defaults.headers.common['Authorization'] = `Bearer ${res?.data?.token}`;
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// change password api function
export const changePassword = async (details) => {
  return await axios
    .patch(`auth/changepassword`, details, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
// get client booking api function
export const getClientBooking = async ({
  perPage = 20, // TOTAL DATA IN A SINGLE PAGE
  search = "", // SEARCH QUERY
  page = 1, // PAGE NUMBER
  status = "", // ACCEPT "completed" / "pending"
  id = "",
}) => {
  return await axios
    .get(
      `v1.0/client/bookings/${perPage}?search_key=${search}&page=${page}&status=${
        status !== undefined ? status : ""
      }&id=${id}`,
      getApiConfig()
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// get client pre booking api function
export const getClientPreBooking = async ({
  perPage = 20, // TOTAL DATA IN A SINGLE PAGE
  search = "", // SEARCH QUERY
  page = 1, // PAGE NUMBER
  status = "", // ACCEPT "completed" / "pending"
  id = "",
}) => {
  return await axios
    .get(
      `v1.0/client/pre-bookings/${perPage}?search_key=${search}&page=${page}&status=${
        status !== undefined ? status : ""
      }&id=${id}`,
      getApiConfig()
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// get client job api function
export const getClientJobs = async ({
  perPage = 20, // TOTAL DATA IN A SINGLE PAGE
  search = "", // SEARCH QUERY
  page = 1, // PAGE NUMBER
  status = "", // ACCEPT "completed" / "pending"
  id = "",
}) => {
  return await axios
    .get(
      `v1.0/client/jobs/${perPage}?search_key=${search}&page=${page}&status=${status}&id=${id}`,
      getApiConfig()
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// change booking status api function
export const changeBookingStatus = async (details) => {
  return await axios
    .patch(`v1.0/client/bookings/change-status`, details, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// delete client booking api function
export const deleteClientBooking = async (id) => {
  return await axios
    .delete(`v1.0/client/bookings/${id}`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// delete client pre booking api function
export const deleteClientPreBooking = async (id) => {
  return await axios
    .delete(`v1.0/client/pre-bookings/${id}`, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// check email validation api function
export const checkEmail = async (details) => {
  const data = {
    email: details,
  };
  return await axios
    .post(`auth/check/email`, data, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// pre booking bid api function
export const preBookingsBisManage = async (details) => {
  return await axios
    .post(`v1.0/client/pre-bookings/confirm`, details, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// garage Registration api function
export const garageRegistration = async (data) => {
  return await axios
    .post(`v1.0/auth/user-register-with-garage`, data, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// RESET PASSWORD
export const resetPassword = async ({ token, data }) => {
  return await axios
    .patch(`/forgetpassword/reset/${token}`, data, getApiConfig())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
