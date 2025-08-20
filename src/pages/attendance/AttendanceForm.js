import React from 'react';
import GenericForm from '../../components/GenericForm';

const AttendanceForm = ({ initialData, onSubmit, onCancel }) => {
  const fields = [
    { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { value: 'present', label: 'Present' },
      { value: 'absent', label: 'Absent' },
      { value: 'leave', label: 'Leave' },
      { value: 'holiday', label: 'Holiday' }
    ]},
    { name: 'checkInTime', label: 'Check In Time', type: 'time' },
    { name: 'checkOutTime', label: 'Check Out Time', type: 'time' },
    { name: 'notes', label: 'Notes', type: 'textarea' }
  ];

  const handleSubmit = (data) => {
    // Format the date properly
    if (data.date) {
      data.date = new Date(data.date).toISOString();
    }
    
    onSubmit(data);
  };

  return (
    <GenericForm
      fields={fields}
      initialValues={initialData || {}}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitButtonText={initialData ? "Update Attendance" : "Record Attendance"}
    />
  );
};

export default AttendanceForm;