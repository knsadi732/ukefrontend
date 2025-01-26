import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import jwt from "jwt-decode";

class AuthService {
  login = (formdata) => {
    try {
      return axios({
        method: "post",
        url: `http://localhost:5000/auth/login`,
        data: formdata,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
export default  authService;
