import apiService from './apiService';

class UserService {
  // Get all users
  async getAllUsers() {
    return await apiService.get('/users');
  }

  // Get user by ID
  async getUserById(id) {
    return await apiService.get(`/users/${id}`);
  }

  // Create new user
  async createUser(userData) {
    return await apiService.post('/users', userData);
  }

  // Update user
  async updateUser(id, userData) {
    return await apiService.put(`/users/${id}`, userData);
  }

  // Delete user
  async deleteUser(id) {
    return await apiService.delete(`/users/${id}`);
  }

  // Get user roles
  async getUserRoles() {
    return await apiService.get('/roles');
  }
}

const userService = new UserService();
export default userService;