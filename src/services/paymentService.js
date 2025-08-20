import apiService from './apiService';

class PaymentService {
  // Get all payment records
  async getAllPaymentRecords() {
    return await apiService.get('/payments');
  }

  // Get payment record by ID
  async getPaymentRecordById(id) {
    return await apiService.get(`/payments/${id}`);
  }

  // Create new payment record
  async createPaymentRecord(paymentData) {
    return await apiService.post('/payments', paymentData);
  }

  // Update payment record
  async updatePaymentRecord(id, paymentData) {
    return await apiService.put(`/payments/${id}`, paymentData);
  }

  // Delete payment record
  async deletePaymentRecord(id) {
    return await apiService.delete(`/payments/${id}`);
  }
}

const paymentService = new PaymentService();
export default paymentService;