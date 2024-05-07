import axios from "axios";
import store from "../../Store/store";

const BASE_URL = "http://localhost:5000";

const defaultHeaders = {
  isAuth: true,
  AdditionalParams: {},
  isJsonRequest: true,
  api_key: true,
};

export const ApiPostNoAuth = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL + type, userData)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error?.response?.data);
        }
      });
  });
};

export const ApiGetNoAuth = (type) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BASE_URL + type)
      .then(async (responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const ApiGet = (type) => {
  let ext = "/admin";
  return new Promise((resolve, reject) => {
    axios
      .get(BASE_URL + ext + type, getHttpOptions())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response?.data);
        }
      });
  });
};

export const ApiPost = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL + "/admin" + type, userData, getHttpOptions())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response?.data);
        }
      });
  });
};
export const ApiPatch = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL + "/admin" + type, userData, getHttpOptions())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response?.data);
        }
      });
  });
};

export const ApiPut = (type, userData) => {
  let ext = "/admin";
  return new Promise((resolve, reject) => {
    axios
      .put(BASE_URL + ext + type, userData)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};

export const ApiDelete = (type) => {
  let ext = "/admin";
  return new Promise((resolve, reject) => {
    axios
      .delete(BASE_URL + ext + type, getHttpOptions())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response?.data);
        }
      });
  });
};

export const ApiUpload = (type, userData, AdditionalHeader) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL + type, userData, {
        ...getHttpOptionsForUpload(),
        ...AdditionalHeader,
      })
      .then((responseJson) => {
        // resolve(responseJson);
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty("response") &&
          error.response &&
          error.response.hasOwnProperty("data") &&
          error.response.data &&
          error.response.data.hasOwnProperty("error") &&
          error.response.data.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response?.data);
        }
      });
  });
};
export const getHttpOptions = (options = defaultHeaders) => {
  let headers = {};

  if (options.hasOwnProperty("isAuth") && options.isAuth) {
    headers["Authorization"] = store.getState().adminAuth.token;
    headers["Cache-Control"] = "no-cache";
  }

  if (options.hasOwnProperty("isJsonRequest") && options.isJsonRequest) {
    headers["Content-Type"] = "application/json";
  }

  if (options.hasOwnProperty("AdditionalParams") && options.AdditionalParams) {
    headers = { ...headers, ...options.AdditionalParams };
  }

  return { headers };
};
export const getHttpOptionsForUpload = (options = defaultHeaders) => {
  let headers = {};
  let token = localStorage.getItem("persist:adminAuth_satdham");
  token = JSON.parse(JSON.parse(token).token);

  if (options.hasOwnProperty("isAuth") && options.isAuth) {
    headers["Authorization"] = token;
    headers["Cache-Control"] = "no-cache";
  }

  if (options.hasOwnProperty("isJsonRequest") && options.isJsonRequest) {
    headers["Content-Type"] = "application/json";
  }

  if (options.hasOwnProperty("AdditionalParams") && options.AdditionalParams) {
    headers = { ...headers, ...options.AdditionalParams };
  }

  headers["Content-Type"] = "multipart/form-data";

  return { headers };
};
