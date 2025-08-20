import React from 'react';
import GenericForm from '../../components/GenericForm';

const ToolForm = ({ initialData, onSubmit, onCancel }) => {
  const fields = [
    { name: 'name', label: 'Tool Name', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { value: 'available', label: 'Available' },
      { value: 'in-use', label: 'In Use' },
      { value: 'maintenance', label: 'Maintenance' },
      { value: 'retired', label: 'Retired' }
    ]},
    { name: 'quantity', label: 'Quantity', type: 'number', required: true },
    { name: 'description', label: 'Description', type: 'textarea' }
  ];

  const handleSubmit = (data) => {
    // Convert quantity to number
    if (data.quantity) {
      data.quantity = parseInt(data.quantity);
    }
    onSubmit(data);
  };

  return (
    <GenericForm
      fields={fields}
      initialValues={initialData || {}}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitButtonText={initialData ? "Update Tool" : "Add Tool"}
    />
  );
};

export default ToolForm;