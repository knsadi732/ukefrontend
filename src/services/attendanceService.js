import apiService from './apiService';

class AttendanceService {
  // Get all attendance records
  async getAllAttendanceRecords() {
    return await apiService.get('/attendance');
  }

  // Get attendance record by ID
  async getAttendanceRecordById(id) {
    return await apiService.get(`/attendance/${id}`);
  }

  // Create new attendance record
  async createAttendanceRecord(attendanceData) {
    return await apiService.post('/attendance', attendanceData);
  }

  // Update attendance record
  async updateAttendanceRecord(id, attendanceData) {
    return await apiService.put(`/attendance/${id}`, attendanceData);
  }

  // Delete attendance record
  async deleteAttendanceRecord(id) {
    return await apiService.delete(`/attendance/${id}`);
  }
}

const attendanceService = new AttendanceService();
export default attendanceService;