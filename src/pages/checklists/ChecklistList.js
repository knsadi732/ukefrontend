import React from 'react';
import GenericList from '../../components/GenericList';
import checklistService from '../../services/checklistService';
import ChecklistForm from './ChecklistForm';
import { Card } from 'react-bootstrap';

const ChecklistList = () => {
  const columns = [
    { header: 'Title', key: 'title' },
    { header: 'Category', key: 'category' },
    { header: 'Items', key: 'items', render: (item) => item.items ? item.items.length : 0 }
  ];

  const renderViewModal = (checklist) => (
    <div>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Checklist Details</Card.Title>
          <Card.Text><strong>Title:</strong> {checklist.title}</Card.Text>
          <Card.Text><strong>Category:</strong> {checklist.category}</Card.Text>
          <Card.Text><strong>Description:</strong> {checklist.description || 'N/A'}</Card.Text>
          
          <h6>Checklist Items:</h6>
          {checklist.items && checklist.items.length > 0 ? (
            <ul>
              {checklist.items.map((item, index) => (
                <li key={index}>{item.text}</li>
              ))}
            </ul>
          ) : (
            <p>No items in this checklist</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <GenericList
      title="Checklists"
      service={checklistService}
      columns={columns}
      renderCreateForm={(onSubmit, onCancel) => (
        <ChecklistForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderEditForm={(checklist, onSubmit, onCancel) => (
        <ChecklistForm initialData={checklist} onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderViewModal={renderViewModal}
    />
  );
};

export default ChecklistList;