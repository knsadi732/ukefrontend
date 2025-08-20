import React from 'react';
import GenericList from '../../components/GenericList';
import workOrderService from '../../services/workOrderService';
import WorkOrderForm from './WorkOrderForm';
import { Card } from 'react-bootstrap';

const WorkOrderList = () => {
  const columns = [
    { header: 'Title', key: 'title' },
    { header: 'Site', key: 'site' },
    { header: 'Status', key: 'status' },
    { header: 'Priority', key: 'priority' },
    { header: 'Due Date', key: 'dueDate', render: (item) => new Date(item.dueDate).toLocaleDateString() }
  ];

  const renderViewModal = (workOrder) => (
    <div>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Work Order Details</Card.Title>
          <Card.Text><strong>Title:</strong> {workOrder.title}</Card.Text>
          <Card.Text><strong>Site:</strong> {workOrder.site}</Card.Text>
          <Card.Text><strong>Status:</strong> {workOrder.status}</Card.Text>
          <Card.Text><strong>Priority:</strong> {workOrder.priority}</Card.Text>
          <Card.Text><strong>Due Date:</strong> {new Date(workOrder.dueDate).toLocaleDateString()}</Card.Text>
          <Card.Text><strong>Description:</strong> {workOrder.description || 'N/A'}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <GenericList
      title="Work Orders"
      service={workOrderService}
      columns={columns}
      renderCreateForm={(onSubmit, onCancel) => (
        <WorkOrderForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderEditForm={(workOrder, onSubmit, onCancel) => (
        <WorkOrderForm initialData={workOrder} onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderViewModal={renderViewModal}
    />
  );
};

export default WorkOrderList;