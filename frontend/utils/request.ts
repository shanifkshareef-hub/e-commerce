import axios, { AxiosError, AxiosResponse } from "axios";
import { API_HOST, clearCookies } from "./helpers";
import Cookies from "universal-cookie";
import { notification } from "antd";
const cookieStore = new Cookies();

const codeMessage: Record<number, string> = {
  200: "The server successfully returned the requested data.",
  201: "The new or modified data was successful.",
  202: "A request has entered the background queue (asynchronous task).",
  204: "The deletion of data was successful.",
  400: "There was an error in the request and the server did not take action to create or modify the data.",
  401: "The user does not have permissions (token, user name, password error).",
  403: "Users are authorized, but access is prohibited.",
  404: "Requests are made for records that do not exist and the server does not operate.",
  406: "The format of the request is not available.",
  410: "The requested resource is permanently deleted and is no longer available.",
  422: "When an object is created, a validation error occurs.",
  500: "There is an error with the server, please check the server.",
  502: "Gateway error.",
  503: "The service is not available, the server is temporarily overloaded or maintained.",
  504: "The gateway timed out.",
};

const request = axios.create({
  baseURL: API_HOST, // our API base URL
});

// Request interceptor for adding the bearer token
request.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${cookieStore.get("token") ?? ""}`;

  return config;
});

// Response interceptor
request.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response) {
      let data: any = error.response.data;
      let message = data.message as string;
      let statusCode = error.response.status;

      notification.error({
        message: message.charAt(0).toUpperCase().concat(message.substring(1)),
        description: codeMessage[statusCode],
      });

      if (statusCode === 401 && window.location.pathname !== "/login") {
        clearCookies();
        window.location.href = "/login";
      }
    } else if (error.request) {
      notification.error({
        message: "Unable to handle request",
        description: "Check with administrator",
      });
    } else {
      notification.error({
        message: "Network anomaly",
        description:
          "Your network has an exception and cannot connect to the server",
      });
    }
  }
);

// Export the api instance
export default request;
