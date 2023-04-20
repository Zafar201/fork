import axios from "axios";

// export let mode = "dev";
export let mode = "prod";
// export let mode = "staging";
// export let mode = 'dedicated';

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

const HTTP = axios.create({
  baseURL,
  // timeout: 600000,
  headers: {
    "Content-Type": "application/json",
    // 'x-api-key': process.env.REACT_APP_API_KEY,
  },
});

// HTTP.interceptors.response.use(
//   (resp) => resp,
//   async (err) => {
//     const origReqConfig = err.config;

//     if (err.response.status >= 500) {
//       return HTTP.request(origReqConfig);
//     }

//     if (
//       err.response.status === 401 &&
//       origReqConfig.headers.hasOwnProperty("Authorization")
//     ) {
//       const rtoken = localStorage.getItem("refresh-token") || "";
//       if (rtoken) {
//         delete origReqConfig.headers["Authorization"];

//         _retry = refresh(rtoken)
//           .finally(() => (_retry = null))
//           .catch((error) => Promise.reject(error));

//         return _retry.then((token) => {
//           origReqConfig.headers["Authorization"] = `Bearer ${token}`;
//           return HTTP.request(origReqConfig);
//         });
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// const refresh = async (rtoken) => {
//   let _rtoken = "";
//   let _token = "";

//   const params = { rtoken: rtoken };
//   const headers = { headers: { "x-api-key": process.env.REACT_APP_API_KEY } };

//   try {
//     const response = await axios.post(
//       `${process.env.REACT_APP_API_BASEURL}/refresh`,
//       params,
//       headers
//     );

//     _rtoken = response.data.rtoken;
//     _token = response.data.token;

//     localStorage.setItem("refresh-token", _rtoken);
//     sessionStorage.setItem("auth-token", _token);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     return _token;
//   }
// };

export { HTTP };
