import apiService from './apiService';

class ToolService {
  // Get all tools
  async getAllTools() {
    return await apiService.get('/tools');
  }

  // Get tool by ID
  async getToolById(id) {
    return await apiService.get(`/tools/${id}`);
  }

  // Create new tool
  async createTool(toolData) {
    return await apiService.post('/tools', toolData);
  }

  // Update tool
  async updateTool(id, toolData) {
    return await apiService.put(`/tools/${id}`, toolData);
  }

  // Delete tool
  async deleteTool(id) {
    return await apiService.delete(`/tools/${id}`);
  }
}

const toolService = new ToolService();
export default toolService;