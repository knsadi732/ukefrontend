import React from 'react';
import GenericForm from '../../components/GenericForm';

const DprForm = ({ initialData, onSubmit, onCancel }) => {
  const fields = [
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'site', label: 'Site', type: 'text', required: true },
    { name: 'workDescription', label: 'Work Description', type: 'textarea', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { value: 'pending', label: 'Pending' },
      { value: 'in-progress', label: 'In Progress' },
      { value: 'completed', label: 'Completed' }
    ]},
    { name: 'measurements', label: 'Measurements', type: 'textarea' },
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
      submitButtonText={initialData ? "Update DPR" : "Create DPR"}
    />
  );
};

export default DprForm;