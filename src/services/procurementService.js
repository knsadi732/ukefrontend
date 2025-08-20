import apiService from './apiService';

class ProcurementService {
  // Get all procurement orders
  async getAllProcurementOrders() {
    return await apiService.get('/procurement');
  }

  // Get procurement order by ID
  async getProcurementOrderById(id) {
    return await apiService.get(`/procurement/${id}`);
  }

  // Create new procurement order
  async createProcurementOrder(procurementData) {
    return await apiService.post('/procurement', procurementData);
  }

  // Update procurement order
  async updateProcurementOrder(id, procurementData) {
    return await apiService.put(`/procurement/${id}`, procurementData);
  }

  // Delete procurement order
  async deleteProcurementOrder(id) {
    return await apiService.delete(`/procurement/${id}`);
  }
}

const procurementService = new ProcurementService();
export default procurementService;