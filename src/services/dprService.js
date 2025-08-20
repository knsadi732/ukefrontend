import apiService from './apiService';

class DprService {
  // Get all DPR records
  async getAllDprRecords() {
    return await apiService.get('/dpr');
  }

  // Get DPR record by ID
  async getDprRecordById(id) {
    return await apiService.get(`/dpr/${id}`);
  }

  // Create new DPR record
  async createDprRecord(dprData) {
    return await apiService.post('/dpr', dprData);
  }

  // Update DPR record
  async updateDprRecord(id, dprData) {
    return await apiService.put(`/dpr/${id}`, dprData);
  }

  // Delete DPR record
  async deleteDprRecord(id) {
    return await apiService.delete(`/dpr/${id}`);
  }
}

const dprService = new DprService();
export default dprService;