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
        url: `http://localhost:5000/api/user/create`,
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
  GetUsers = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/user/get-users`,
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
  getUserById = async (formData) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/user/get-user-by-id`,
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
        url: `http://localhost:5000/api/user/update-user-by-id/${id}`,
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
  DeleteUserById = async ( formData) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/user/delete-user-by-id`,
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
