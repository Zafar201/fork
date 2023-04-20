import axios from "axios";

const CancelToken = axios.CancelToken;
let cancel;

// let mode = "dev";
let mode = "prod";
// let mode = "staging";
// let mode = 'dedicated';

let baseValues = {
  baseProtocol: {
    dev: "http://",
    staging: "https://",
    prod: "https://",
  },
  baseHost: {
    dev: process.env.REACT_APP_DEV_URL,
    staging: "www.staging.useleadbot.com",
    prod: process.env.REACT_APP_PROD_URL,
  },
};

let baseProtocol = baseValues.baseProtocol[mode];
let baseHost = baseValues.baseHost[mode];
const baseURL = baseProtocol + baseHost;

// let _retry = null;

const cancelTokenHTTP = axios.create({
  baseURL,
  // timeout: 600000,
  headers: {
    "Content-Type": "application/json",
    // 'x-api-key': process.env.REACT_APP_API_KEY,
  },
});

const setAuthToken = (token) => {
  if (token) {
    //applying token
    cancelTokenHTTP.defaults.headers.common["Authorization"] = token;
  } else {
    //deleting the token from header
    delete cancelTokenHTTP.defaults.headers.common["Authorization"];
  }
};

const setContentType = (content_type) => {
  if (content_type) {
    //applying content_type
    cancelTokenHTTP.defaults.headers.post["Content-Type"] = content_type;
  }
};

cancelTokenHTTP.interceptors.request.use(
  (config) => {
    if (cancel) {
      cancel(); // cancel request
    }

    config.cancelToken = new CancelToken(function executor(c) {
      cancel = c;
    });

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { mode, cancelTokenHTTP, setContentType, setAuthToken };
