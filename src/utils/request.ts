import { store } from "../index";
import { showLoader, hideLoader } from "./../store/actions/loader.action";
import axios from "axios";

var baseURL = process.env.REACT_APP_API_ENDPOINT;

const request = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  function (config) {
    store.dispatch(showLoader());
    if (config?.headers?.Authorization) {
      return config;
    }
    // const token = authStorage.token();
    // if (token) {
    //   Object.assign(config.headers, {
    //     Authorization: `Bearer ${authStorage.token()}`,
    //   });
    // }
    return config;
  },
  function (error) {
    store.dispatch(hideLoader());
    // Do something with request error
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response: any) {
    store.dispatch(hideLoader());
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      window.location.reload();
    }
    store.dispatch(hideLoader());
    return Promise.reject(error.response);
  }
);
export default request;
