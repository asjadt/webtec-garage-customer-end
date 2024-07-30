export const getApiConfig = () => {
    let data = JSON.parse(localStorage.getItem("user_data"));
    let config = {
      headers: { Authorization: `Bearer ${data?.token}` },
    };
    return config;
  }