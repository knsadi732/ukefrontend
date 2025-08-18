// tokenManager.js
import axios from "axios";
import { errorToast } from "../react-toastfiy/toast";
import { jwtDecode } from "jwt-decode";

let isTokenRefreshing = false;
let requestQueue = [];

const tokenManager = {
  isTokenValid(config) {
    // Add your logic to check if the access token is valid and not expired.
    // You may want to check the token's expiry date and compare it with the current time.
    // Return true if the token is valid; otherwise, return false.
    const current_time_second = Math.round(Date.now() / 1000);
    // Get the Authorization header from the request headers
    const accessToken = config.headers["Authorization"];
    console.log(accessToken);
    if (accessToken) {
      const decoded_access_token = jwtDecode(accessToken);
      return decoded_access_token.exp > current_time_second;
    } else {
      return false;
    }
  },

  getAccessToken(config) {
    const authorizationHeader = config.headers['Authorization'];
  
    if (authorizationHeader) {

      return authorizationHeader;
    }
  
    return null; // Return null if no valid token is found
  },

  async refreshToken() {
    if (isTokenRefreshing) {
      // If a token refresh is already in progress, wait for it to complete.
      return new Promise((resolve) => {
        requestQueue.push(resolve);
      });
    }

    isTokenRefreshing = true;
    try {
      // Add your logic to make the refresh token request and obtain a new access token.
      const response = await axios.post(
        "/refreshToken",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("refreshToken"),
          },
        }
      );
      if (response.data.status === 200) {
        const newAccessToken = response.data.token;
        axios.defaults.headers.common["Authorization"] = newAccessToken;

        // Resolve all the queued requests with the new access token.
        requestQueue.forEach((resolve) => resolve(newAccessToken));
        requestQueue = [];
        return newAccessToken;
      } else {
        errorToast(response.data.msg);
      }
    } catch (error) {
      // Handle any error that may occur during the token refresh process.
      // Log the user out and clear the queue on error.
      localStorage.clear();
      requestQueue = [];
      window.location.replace("/sign-in");
    } finally {
      isTokenRefreshing = false;
    }
  },

  async getRefreshToken() {
    try {
      // Add your logic to make the refresh token request and obtain a new access token.
      const response = await axios.post(
        "/refreshToken",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("refreshToken"),
          },
        }
      );
      return response
    } catch (error) {
      // Handle any error that may occur during the token refresh process.
      // Log the user out and clear the queue on error.
      localStorage.clear();
      requestQueue = [];
      window.location.replace("/sign-in");
    }
  },

  queueRequest(config) {
    return new Promise((resolve) => {
      requestQueue.push(resolve);
    });
  },

  clearQueue() {
    requestQueue = [];
  },
};

export default tokenManager;
