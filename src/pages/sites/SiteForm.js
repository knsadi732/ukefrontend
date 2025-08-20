import React from 'react';
import GenericForm from '../../components/GenericForm';

const SiteForm = ({ initialData, onSubmit, onCancel }) => {
  const fields = [
    { name: 'name', label: 'Site Name', type: 'text', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'manager', label: 'Site Manager', type: 'text' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'completed', label: 'Completed' }
    ]},
    { name: 'description', label: 'Description', type: 'textarea' }
  ];

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <GenericForm
      fields={fields}
      initialValues={initialData || {}}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitButtonText={initialData ? "Update Site" : "Create Site"}
    />
  );
};

export default SiteForm;