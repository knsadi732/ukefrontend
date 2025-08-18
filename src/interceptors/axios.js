// originalCode.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { errorToast } from "../react-toastfiy/toast";

axios.defaults.baseURL = "http://localhost:5000";

const excludedURLs = ["/accessToken", "/login"];

console.log("Axios File Working");

axios.interceptors.request.use(async (config) => {
  // console.log({ config }, config?.headers?.Authorization);
  let token = config?.headers?.Authorization
    ? config?.headers?.Authorization
    : config?.headers?.common?.Authorization;
  if (token) {
    console.log({ token });
    const decoded_access_token_exp_time = jwtDecode(token).exp;
    const current_time_second = Math.round(new Date() / 1000);
    console.log(
      { decoded_access_token_exp_time, current_time_second },
      decoded_access_token_exp_time <= current_time_second
    );
    if (decoded_access_token_exp_time <= current_time_second) {
      token = undefined;
    }
  }
  const accessToken = localStorage.getItem("accessToken");
  if (
    accessToken &&
    !token &&
    !window.fetchingaccessToken &&
    !excludedURLs.includes(config.url)
  ) {
    window.tokenAboutToExpire = true;
    window.fetchingaccessToken = true;

    try {
      console.log("response");
      const response = await axios.post(
        "/accessToken",
        {},
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      console.log({ response });

      if (response.data.status === 200) {
        const newAccessToken = response.data.token;
        axios.defaults.headers.common["Authorization"] = newAccessToken;
        window.tokenAboutToExpire = false;
        window.fetchingaccessToken = false;

        window.requestQueue.forEach(({ resolve, config }) => {
          resolve({
            ...config,
            headers: { ...config?.headers, Authorization: newAccessToken },
          });
        });
        window.requestQueue = [];

        return {
          ...config,
          headers: { ...config?.headers, Authorization: newAccessToken },
        };
      } else if (response.data.status === 401) {
        localStorage.clear();
        window.location.replace("/sign-in");
        window.tokenAboutToExpire = false;
        window.fetchingaccessToken = false;
        window.requestQueue = []; // Clear
      } else {
        console.log(response.data.msg);
        // errorToast(response.data.msg);
      }
    } catch (error) {
      console.error("Error accessing token:", error?.config?.headers);
      console.log({ error });
      window.tokenAboutToExpire = false;
      window.fetchingaccessToken = false;
      window.requestQueue = []; // Clear
    }
  }

  if (!window.tokenAboutToExpire || excludedURLs.includes(config.url)) {
    return config;
  } else {
    return new Promise((resolve) => {
      window.requestQueue.push({ resolve, config });
    });
  }
});

axios.interceptors.response.use((resp) => {
  console.log({ resp });
  console.log(
    resp?.data?.status === 401 && !excludedURLs?.includes(resp?.config?.url)
  );
  if (
    resp?.data?.status === 401 &&
    !excludedURLs?.includes(resp?.config?.url)
  ) {
    console.log({ resp });
    return resp;
  } else {
    return resp;
  }
});
