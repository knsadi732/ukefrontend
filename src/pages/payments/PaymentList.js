import React from 'react';
import GenericList from '../../components/GenericList';
import paymentService from '../../services/paymentService';
import PaymentForm from './PaymentForm';
import { Card } from 'react-bootstrap';

const PaymentList = () => {
  const columns = [
    { header: 'Employee', key: 'employeeName' },
    { header: 'Amount', key: 'amount', render: (item) => `₹${item.amount}` },
    { header: 'Payment Date', key: 'paymentDate', render: (item) => new Date(item.paymentDate).toLocaleDateString() },
    { header: 'Payment Type', key: 'paymentType' },
    { header: 'Status', key: 'status' }
  ];

  const renderViewModal = (payment) => (
    <div>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Payment Details</Card.Title>
          <Card.Text><strong>Employee:</strong> {payment.employeeName}</Card.Text>
          <Card.Text><strong>Amount:</strong> ₹{payment.amount}</Card.Text>
          <Card.Text><strong>Payment Date:</strong> {new Date(payment.paymentDate).toLocaleDateString()}</Card.Text>
          <Card.Text><strong>Payment Type:</strong> {payment.paymentType}</Card.Text>
          <Card.Text><strong>Status:</strong> {payment.status}</Card.Text>
          <Card.Text><strong>Description:</strong> {payment.description || 'N/A'}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <GenericList
      title="Payment Records"
      service={paymentService}
      columns={columns}
      renderCreateForm={(onSubmit, onCancel) => (
        <PaymentForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderEditForm={(payment, onSubmit, onCancel) => (
        <PaymentForm initialData={payment} onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderViewModal={renderViewModal}
    />
  );
};

export default PaymentList;