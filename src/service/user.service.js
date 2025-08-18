import axios from "axios";

class UserService {
  CreateUser = async (formData) => {
    console.log("FormData payload:");
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios({
        method: "post",
        url: `/api/user/create`,
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in CreateUser service:", error);
      throw error;
    }
  };
  GetUsers = (formdata) => {
    const token = localStorage.getItem("accessToken");

    return axios({
      method: "post",
      url: `/api/user/get-users`,
      data: formdata,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.data)
      .catch((error) => console.log("API Error:", error));
  };

  getUserById = async (formData) => {
    try {
      const response = await axios({
        method: "post",
        url: `/api/user/get-user-by-id`,
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in CreateUser service:", error);
      throw error;
    }
  };
  UpdateUser = async (id, formData) => {
    try {
      const response = await axios({
        method: "post",
        url: `/api/user/update-user-by-id/${id}`,
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in CreateUser service:", error);
      throw error;
    }
  };
  DeleteUserById = async (formData) => {
    try {
      const response = await axios({
        method: "post",
        url: `/api/user/delete-user-by-id`,
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in CreateUser service:", error);
      throw error;
    }
  };
}
const userService = new UserService();
export default userService;
