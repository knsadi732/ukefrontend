import axios from "axios";

class RoleService {
  CreateRole = async (formData) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/role/create`,
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

  GetRoles = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/role/get-roles`,
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
  getRolesById = async (formData) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/role/get-roles-by-id`,
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
  DeleteRoleById = async (formData) => {
      console.log("FormData payload:");
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/role/delete-roles-by-id`,
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
const roleService =  new RoleService();
export default roleService;
