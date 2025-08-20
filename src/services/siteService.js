import apiService from './apiService';

class SiteService {
  // Get all sites
  async getAllSites() {
    return await apiService.get('/sites');
  }

  // Get site by ID
  async getSiteById(id) {
    return await apiService.get(`/sites/${id}`);
  }

  // Create new site
  async createSite(siteData) {
    return await apiService.post('/sites', siteData);
  }

  // Update site
  async updateSite(id, siteData) {
    return await apiService.put(`/sites/${id}`, siteData);
  }

  // Delete site
  async deleteSite(id) {
    return await apiService.delete(`/sites/${id}`);
  }
}

const siteService = new SiteService();
export default siteService;