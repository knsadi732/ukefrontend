import React from 'react';
import GenericForm from '../../components/GenericForm';

const PaymentForm = ({ initialData, onSubmit, onCancel }) => {
  const fields = [
    { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
    { name: 'amount', label: 'Amount (₹)', type: 'number', required: true },
    { name: 'paymentDate', label: 'Payment Date', type: 'date', required: true },
    { name: 'paymentType', label: 'Payment Type', type: 'select', required: true, options: [
      { value: 'salary', label: 'Salary' },
      { value: 'bonus', label: 'Bonus' },
      { value: 'advance', label: 'Advance' },
      { value: 'reimbursement', label: 'Reimbursement' }
    ]},
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { value: 'pending', label: 'Pending' },
      { value: 'paid', label: 'Paid' },
      { value: 'cancelled', label: 'Cancelled' }
    ]},
    { name: 'description', label: 'Description', type: 'textarea' }
  ];

  const handleSubmit = (data) => {
    // Convert amount to number
    if (data.amount) {
      data.amount = parseFloat(data.amount);
    }
    
    // Format the date properly
    if (data.paymentDate) {
      data.paymentDate = new Date(data.paymentDate).toISOString();
    }
    
    onSubmit(data);
  };

  return (
    <GenericForm
      fields={fields}
      initialValues={initialData || {}}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitButtonText={initialData ? "Update Payment" : "Record Payment"}
    />
  );
};

export default PaymentForm;