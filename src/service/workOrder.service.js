import axios from "axios";

class WorkOrderService {
  CreateWorkOrder = async (formData) => {
    console.log("FormData payload:");
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/work-order/create`,
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in Create Work Order service:", error);
      throw error;
    }
  };
  GetWorkOrders = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/work-order/get-work_orders`,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in CreateWorkOrder service:", error);
      throw error;
    }
  };
  getWorkOrderById = async (formData) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/WorkOrder/get-WorkOrder-by-id`,
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in CreateWorkOrder service:", error);
      throw error;
    }
  };
  UpdateWorkOrder = async (id, formData) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/WorkOrder/update-WorkOrder-by-id/${id}`,
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in CreateWorkOrder service:", error);
      throw error;
    }
  };
  DeleteWorkOrderById = async (formData) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/api/WorkOrder/delete-WorkOrder-by-id`,
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in CreateWorkOrder service:", error);
      throw error;
    }
  };
}
const workOrderService = new WorkOrderService();
export default workOrderService;
