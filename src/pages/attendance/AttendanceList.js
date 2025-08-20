import React from 'react';
import GenericList from '../../components/GenericList';
import attendanceService from '../../services/attendanceService';
import AttendanceForm from './AttendanceForm';
import { Card } from 'react-bootstrap';

const AttendanceList = () => {
  const columns = [
    { header: 'Employee', key: 'employeeName' },
    { header: 'Date', key: 'date', render: (item) => new Date(item.date).toLocaleDateString() },
    { header: 'Status', key: 'status' },
    { header: 'Check In', key: 'checkInTime' },
    { header: 'Check Out', key: 'checkOutTime' }
  ];

  const renderViewModal = (attendance) => (
    <div>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Attendance Record</Card.Title>
          <Card.Text><strong>Employee:</strong> {attendance.employeeName}</Card.Text>
          <Card.Text><strong>Date:</strong> {new Date(attendance.date).toLocaleDateString()}</Card.Text>
          <Card.Text><strong>Status:</strong> {attendance.status}</Card.Text>
          <Card.Text><strong>Check In Time:</strong> {attendance.checkInTime || 'N/A'}</Card.Text>
          <Card.Text><strong>Check Out Time:</strong> {attendance.checkOutTime || 'N/A'}</Card.Text>
          <Card.Text><strong>Notes:</strong> {attendance.notes || 'N/A'}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <GenericList
      title="Attendance Records"
      service={attendanceService}
      columns={columns}
      renderCreateForm={(onSubmit, onCancel) => (
        <AttendanceForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderEditForm={(attendance, onSubmit, onCancel) => (
        <AttendanceForm initialData={attendance} onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderViewModal={renderViewModal}
    />
  );
};

export default AttendanceList;