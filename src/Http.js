import axios from "axios";
import {message, notification} from "antd";

export const Http = axios.create({
  baseURL: `http://sahilgate.com/api`,
});

// authorizer - check if user is logged in on each api call
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
if (user?.token)
  (function () {
    var token = user?.token;
    if (token) {
      Http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      Http.defaults.headers.common["Authorization"] = null;
    }
  })();

const openNotification = (err) => {
  notification.open({
    message: "Unexpected Error",
    description: err,
    onClick: () => {
      console.log("Notification Clicked!");
    },

    className: "notification-error",
  });
};

// interceptors for unexpected errors (500) handling
Http.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // message.error("An unexpected error occurred");
    // message.error(error);
    console.log("error", error.response.data.message);
    openNotification(error.response.data.message);
  }

  return Promise.reject(error);
});
