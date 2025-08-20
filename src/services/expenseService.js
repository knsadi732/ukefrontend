import apiService from './apiService';

class ExpenseService {
  // Get all expense records
  async getAllExpenseRecords() {
    return await apiService.get('/expenses');
  }

  // Get expense record by ID
  async getExpenseRecordById(id) {
    return await apiService.get(`/expenses/${id}`);
  }

  // Create new expense record
  async createExpenseRecord(expenseData) {
    return await apiService.post('/expenses', expenseData);
  }

  // Update expense record
  async updateExpenseRecord(id, expenseData) {
    return await apiService.put(`/expenses/${id}`, expenseData);
  }

  // Delete expense record
  async deleteExpenseRecord(id) {
    return await apiService.delete(`/expenses/${id}`);
  }
}

const expenseService = new ExpenseService();
export default expenseService;