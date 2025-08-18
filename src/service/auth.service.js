import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import jwt from "jwt-decode";

class AuthService {
  login = (formdata) => {
    console.log("Sending login request with form data:", formdata);
    return axios({
      method: "post",
      url: "/api/auth/login", // Your API endpoint
      data: formdata,
      withCredentials: true, // Ensures credentials (cookies) are sent with the request
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Response received:", response);
        // Check if the response is successful
        if (response.status === 200 && response?.data?.data?.accessToken) {
          // Store the access token in localStorage
          const accessToken = response.data.data.accessToken;
          axios.defaults.headers.common["Authorization"] = accessToken;

          localStorage.setItem("accessToken", accessToken);

          // Also store user role
          const role = response.data.data.role;
          localStorage.setItem("role_name", role);

          console.log("Login successful:", response.data);
          return response.data;
        } else {
          console.error("Unexpected response format", response.data);
          throw new Error("Login failed due to unexpected response format");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        throw error;
      });
  };

  logout = async (formdata) => {
    return axios({
      method: "post",
      url: `/logout`,
      data: formdata,
      withCredentials: true,
    }).then((response) => {
      if (response.data.status === 200) {
        localStorage.clear();
      }
      return response.data;
    });
  };
  getCurrentUser() {
    return localStorage.getItem("refreshToken");
  }

  ChangeRoleToken = async (formdata) => {
    try {
      return axios({
        method: "post",
        url: `/change-role-token`,
        data: formdata,
        withCredentials: true,
      }).then((response) => {
        if (response.data.status === 200) {
          axios.defaults.headers.common["Authorization"] =
            response.data.accessToken;
          localStorage.setItem("refreshToken", response.data.refreshToken);
          const user_role = jwtDecode(response.data.refreshToken);
          localStorage.setItem("user_role", user_role.role);
        }
        return response.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  LogOutAllUsers = async (formdata) => {
    try {
      return axios({
        method: "post",
        url: `/users/logout-all-users`,
        data: formdata,
        withCredentials: true,
      }).then((response) => {
        return response.data;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
const authService = new AuthService();
export default authService;
