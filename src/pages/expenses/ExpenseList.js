import React from 'react';
import GenericList from '../../components/GenericList';
import expenseService from '../../services/expenseService';
import ExpenseForm from './ExpenseForm';
import { Card } from 'react-bootstrap';

const ExpenseList = () => {
  const columns = [
    { header: 'Category', key: 'category' },
    { header: 'Amount', key: 'amount', render: (item) => `₹${item.amount}` },
    { header: 'Date', key: 'date', render: (item) => new Date(item.date).toLocaleDateString() },
    { header: 'Status', key: 'status' },
    { header: 'Approved By', key: 'approvedBy' }
  ];

  const renderViewModal = (expense) => (
    <div>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Expense Details</Card.Title>
          <Card.Text><strong>Category:</strong> {expense.category}</Card.Text>
          <Card.Text><strong>Amount:</strong> ₹{expense.amount}</Card.Text>
          <Card.Text><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</Card.Text>
          <Card.Text><strong>Status:</strong> {expense.status}</Card.Text>
          <Card.Text><strong>Approved By:</strong> {expense.approvedBy || 'N/A'}</Card.Text>
          <Card.Text><strong>Description:</strong> {expense.description || 'N/A'}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <GenericList
      title="Expense Records"
      service={expenseService}
      columns={columns}
      renderCreateForm={(onSubmit, onCancel) => (
        <ExpenseForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderEditForm={(expense, onSubmit, onCancel) => (
        <ExpenseForm initialData={expense} onSubmit={onSubmit} onCancel={onCancel} />
      )}
      renderViewModal={renderViewModal}
    />
  );
};

export default ExpenseList;