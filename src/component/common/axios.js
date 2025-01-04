import axios from "axios";
import jwtDecode from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized. Redirect to login.");
    }
    return Promise.reject(error);
  }
);

const loginUser = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });

    if (response.data?.accessToken && response.data?.refreshToken) {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      const userRole = jwtDecode(response.data.refreshToken).role;
      localStorage.setItem("user_role", userRole);

      console.log("Login successful:", response.data);
    } else {
      console.error("Unexpected response format:", response.data);
    }
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
  }
};

export { api, loginUser };
