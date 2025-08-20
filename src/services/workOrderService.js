import apiService from './apiService';

class WorkOrderService {
  // Get all work orders
  async getAllWorkOrders() {
    return await apiService.get('/work-orders');
  }

  // Get work order by ID
  async getWorkOrderById(id) {
    return await apiService.get(`/work-orders/${id}`);
  }

  // Create new work order
  async createWorkOrder(workOrderData) {
    return await apiService.post('/work-orders', workOrderData);
  }

  // Update work order
  async updateWorkOrder(id, workOrderData) {
    return await apiService.put(`/work-orders/${id}`, workOrderData);
  }

  // Delete work order
  async deleteWorkOrder(id) {
    return await apiService.delete(`/work-orders/${id}`);
  }

  // Upload work order document
  async uploadDocument(workOrderId, formData) {
    return await apiService.post(`/work-orders/${workOrderId}/upload`, formData);
  }
}

const workOrderService = new WorkOrderService();
export default workOrderService;