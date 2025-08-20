import React from 'react';
import GenericForm from '../../components/GenericForm';

const ProcurementForm = ({ initialData, onSubmit, onCancel }) => {
  const fields = [
    { name: 'itemName', label: 'Item Name', type: 'text', required: true },
    { name: 'supplier', label: 'Supplier', type: 'text', required: true },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { value: 'pending', label: 'Pending' },
      { value: 'ordered', label: 'Ordered' },
      { value: 'delivered', label: 'Delivered' },
      { value: 'cancelled', label: 'Cancelled' }
    ]},
    { name: 'expectedDate', label: 'Expected Delivery Date', type: 'date', required: true },
    { name: 'description', label: 'Description', type: 'textarea' }
  ];

  const handleSubmit = (data) => {
    // Convert quantity to number
    if (data.quantity) {
      data.quantity = parseInt(data.quantity);
    }
    
    // Format the date properly
    if (data.expectedDate) {
      data.expectedDate = new Date(data.expectedDate).toISOString();
    }
    
    onSubmit(data);
  };

  return (
    <GenericForm
      fields={fields}
      initialValues={initialData || {}}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitButtonText={initialData ? "Update Procurement Order" : "Create Procurement Order"}
    />
  );
};

export default ProcurementForm;