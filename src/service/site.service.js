import axios from "axios";

class SiteService {
  CreateSite = async (formData) => {
    console.log("FormData payload:");
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/site/create`,
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in CreateSite service:", error);
      throw error;
    }
  };
  GetSites = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/site/get-sites`,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in CreateSite service:", error);
      throw error;
    }
  };
  getSiteById = async (formData) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/site/get-site-by-id`,
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in CreateSite service:", error);
      throw error;
    }
  };
  UpdateSite = async (id, formData) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/site/update-site-by-id/${id}`,
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in CreateSite service:", error);
      throw error;
    }
  };
  DeleteSiteById = async (formData) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/site/delete-site-by-id`,
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in CreateSite service:", error);
      throw error;
    }
  };
}
const siteService = new SiteService();
export default siteService;
