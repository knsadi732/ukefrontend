import React from 'react';
import GenericForm from '../../components/GenericForm';

const ExpenseForm = ({ initialData, onSubmit, onCancel }) => {
  const fields = [
    { name: 'category', label: 'Category', type: 'select', required: true, options: [
      { value: 'materials', label: 'Materials' },
      { value: 'labor', label: 'Labor' },
      { value: 'equipment', label: 'Equipment' },
      { value: 'transportation', label: 'Transportation' },
      { value: 'miscellaneous', label: 'Miscellaneous' }
    ]},
    { name: 'amount', label: 'Amount (₹)', type: 'number', required: true },
    { name: 'date', label: 'Expense Date', type: 'date', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { value: 'pending', label: 'Pending' },
      { value: 'approved', label: 'Approved' },
      { value: 'rejected', label: 'Rejected' }
    ]},
    { name: 'approvedBy', label: 'Approved By', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' }
  ];

  const handleSubmit = (data) => {
    // Convert amount to number
    if (data.amount) {
      data.amount = parseFloat(data.amount);
    }
    
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
      submitButtonText={initialData ? "Update Expense" : "Record Expense"}
    />
  );
};

export default ExpenseForm;