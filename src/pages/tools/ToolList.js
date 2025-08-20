import React from 'react';
import GenericList from '../../components/GenericList';
import toolService from '../../services/toolService';
import ToolForm from './ToolForm';
import { Card } from 'react-bootstrap';

const ToolList = () => {
  const columns = [
    { header: 'Name', key: 'name' },
    { header: 'Category', key: 'category' },
    { header: 'Status', key: 'status' },
    { header: 'Quantity', key: 'quantity' }
  ];

  const renderViewModal = (tool) => (
    <div>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Tool Details</Card.Title>
          <Card.Text><strong>Name:</strong> {tool.name}</Card.Text>
          <Card.Text><strong>Category:</strong> {tool.category}</Card.Text>
          <Card.Text><strong>Status:</strong> {tool.status}</Card.Text>
          <Card.Text><strong>Quantity:</strong> {tool.quantity}</Card.Text>
          <Card.Text><strong>Description:</strong> {tool.description || 'N/A'}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <GenericList
      title="Tools & Equipment"
      service={toolService}
      columns={columns}
      renderCreateForm={(onSubmit, onCancel) => (
        <ToolForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderEditForm={(tool, onSubmit, onCancel) => (
        <ToolForm initialData={tool} onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderViewModal={renderViewModal}
    />
  );
};

export default ToolList;