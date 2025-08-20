import React from 'react';
import GenericList from '../../components/GenericList';
import userService from '../../services/userService';
import UserForm from './UserForm';
import { Card } from 'react-bootstrap';

const UserList = () => {
  const columns = [
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    { header: 'Role', key: 'role' },
    { header: 'Status', key: 'status' }
  ];

  const renderViewModal = (user) => (
    <div>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>User Details</Card.Title>
          <Card.Text><strong>Name:</strong> {user.name}</Card.Text>
          <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
          <Card.Text><strong>Role:</strong> {user.role}</Card.Text>
          <Card.Text><strong>Status:</strong> {user.status}</Card.Text>
          <Card.Text><strong>Phone:</strong> {user.phone || 'N/A'}</Card.Text>
          <Card.Text><strong>Address:</strong> {user.address || 'N/A'}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <GenericList
      title="Users"
      service={userService}
      columns={columns}
      renderCreateForm={(onSubmit, onCancel) => (
        <UserForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderEditForm={(user, onSubmit, onCancel) => (
        <UserForm initialData={user} onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderViewModal={renderViewModal}
    />
  );
};

export default UserList;