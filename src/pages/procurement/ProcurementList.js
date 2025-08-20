import React from 'react';
import GenericList from '../../components/GenericList';
import procurementService from '../../services/procurementService';
import ProcurementForm from './ProcurementForm';
import { Card } from 'react-bootstrap';

const ProcurementList = () => {
  const columns = [
    { header: 'Item Name', key: 'itemName' },
    { header: 'Supplier', key: 'supplier' },
    { header: 'Quantity', key: 'quantity' },
    { header: 'Status', key: 'status' },
    { header: 'Expected Date', key: 'expectedDate', render: (item) => new Date(item.expectedDate).toLocaleDateString() }
  ];

  const renderViewModal = (procurement) => (
    <div>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Procurement Order Details</Card.Title>
          <Card.Text><strong>Item Name:</strong> {procurement.itemName}</Card.Text>
          <Card.Text><strong>Supplier:</strong> {procurement.supplier}</Card.Text>
          <Card.Text><strong>Quantity:</strong> {procurement.quantity}</Card.Text>
          <Card.Text><strong>Status:</strong> {procurement.status}</Card.Text>
          <Card.Text><strong>Expected Date:</strong> {new Date(procurement.expectedDate).toLocaleDateString()}</Card.Text>
          <Card.Text><strong>Description:</strong> {procurement.description || 'N/A'}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <GenericList
      title="Procurement Orders"
      service={procurementService}
      columns={columns}
      renderCreateForm={(onSubmit, onCancel) => (
        <ProcurementForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderEditForm={(procurement, onSubmit, onCancel) => (
        <ProcurementForm initialData={procurement} onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderViewModal={renderViewModal}
    />
  );
};

export default ProcurementList;