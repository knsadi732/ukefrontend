import apiService from './apiService';

class ChecklistService {
  // Get all checklists
  async getAllChecklists() {
    return await apiService.get('/checklists');
  }

  // Get checklist by ID
  async getChecklistById(id) {
    return await apiService.get(`/checklists/${id}`);
  }

  // Create new checklist
  async createChecklist(checklistData) {
    return await apiService.post('/checklists', checklistData);
  }

  // Update checklist
  async updateChecklist(id, checklistData) {
    return await apiService.put(`/checklists/${id}`, checklistData);
  }

  // Delete checklist
  async deleteChecklist(id) {
    return await apiService.delete(`/checklists/${id}`);
  }
}

const checklistService = new ChecklistService();
export default checklistService;