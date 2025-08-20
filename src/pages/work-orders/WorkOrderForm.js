import React from 'react';
import GenericForm from '../../components/GenericForm';

const WorkOrderForm = ({ initialData, onSubmit, onCancel }) => {
  const fields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'site', label: 'Site', type: 'text', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { value: 'pending', label: 'Pending' },
      { value: 'in-progress', label: 'In Progress' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' }
    ]},
    { name: 'priority', label: 'Priority', type: 'select', required: true, options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'urgent', label: 'Urgent' }
    ]},
    { name: 'dueDate', label: 'Due Date', type: 'date', required: true },
    { name: 'description', label: 'Description', type: 'textarea' }
  ];

  const handleSubmit = (data) => {
    // Format the date properly
    if (data.dueDate) {
      data.dueDate = new Date(data.dueDate).toISOString();
    }
    onSubmit(data);
  };

  return (
    <GenericForm
      fields={fields}
      initialValues={initialData || {}}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitButtonText={initialData ? "Update Work Order" : "Create Work Order"}
    />
  );
};

export default WorkOrderForm;