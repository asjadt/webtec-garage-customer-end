import axios from "axios";
import { getApiConfig } from "./apiConfig";

// notification api function
export const getNotification = async (perPage = 10, pageNo = 1) => {
  if (JSON.parse(localStorage.getItem("user_data"))) {
    return await axios
      .get(`/v1.0/notifications/${perPage}?page=${pageNo}`, getApiConfig())
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error;
      });
  }
};

export const deleteNotification = async (id) => {
  return await axios
    .delete(`/v1.0/notifications/${id}`, getApiConfig())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const updateNotificationStatus = async ({ notification_ids }) => {
  return await axios
    .put(
      `/v1.0/notifications/change-status`,
      { notification_ids },
      getApiConfig()
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};
