import React, { useState, useEffect } from 'react';
import GenericForm from '../../components/GenericForm';
import userService from '../../services/userService';

const UserForm = ({ initialData, onSubmit, onCancel }) => {
  const [roles, setRoles] = useState([]);

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'text' },
    { name: 'role', label: 'Role', type: 'select', required: true, options: roles },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]},
    { name: 'address', label: 'Address', type: 'textarea' }
  ];

  useEffect(() => {
    // Fetch roles from API
    const fetchRoles = async () => {
      try {
        const roleData = await userService.getUserRoles();
        const roleOptions = roleData.map(role => ({
          value: role.name,
          label: role.name
        }));
        setRoles(roleOptions);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <GenericForm
      fields={fields}
      initialValues={initialData || {}}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitButtonText={initialData ? "Update User" : "Create User"}
    />
  );
};

export default UserForm;