import React from 'react';
import GenericList from '../../components/GenericList';
import dprService from '../../services/dprService';
import DprForm from './DprForm';
import { Card } from 'react-bootstrap';

const DprList = () => {
  const columns = [
    { header: 'Date', key: 'date', render: (item) => new Date(item.date).toLocaleDateString() },
    { header: 'Site', key: 'site' },
    { header: 'Work Description', key: 'workDescription' },
    { header: 'Status', key: 'status' }
  ];

  const renderViewModal = (dpr) => (
    <div>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>DPR Details</Card.Title>
          <Card.Text><strong>Date:</strong> {new Date(dpr.date).toLocaleDateString()}</Card.Text>
          <Card.Text><strong>Site:</strong> {dpr.site}</Card.Text>
          <Card.Text><strong>Work Description:</strong> {dpr.workDescription}</Card.Text>
          <Card.Text><strong>Status:</strong> {dpr.status}</Card.Text>
          <Card.Text><strong>Measurements:</strong> {dpr.measurements || 'N/A'}</Card.Text>
          <Card.Text><strong>Notes:</strong> {dpr.notes || 'N/A'}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <GenericList
      title="Daily Progress Reports (DPR)"
      service={dprService}
      columns={columns}
      renderCreateForm={(onSubmit, onCancel) => (
        <DprForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderEditForm={(dpr, onSubmit, onCancel) => (
        <DprForm initialData={dpr} onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderViewModal={renderViewModal}
    />
  );
};

export default DprList;