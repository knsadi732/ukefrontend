import React, { useState, useEffect } from "react";
import { Container, Table, Button, Card } from "react-bootstrap";

const ViewExpense = () => {
  const [expenses, setExpenses] = useState([]);

  // Static data for expenses
  const staticExpenses = [
    {
      id: 1,
      expenseId: "EXP-2025-001",
      category: "Travel",
      description: "Site visit to Mumbai",
      amount: 5000,
      date: "2025-08-10",
      submittedBy: "John Doe",
      status: "Approved"
    },
    {
      id: 2,
      expenseId: "EXP-2025-002",
      category: "Meals",
      description: "Client meeting lunch",
      amount: 1500,
      date: "2025-08-12",
      submittedBy: "Jane Smith",
      status: "Pending"
    },
    {
      id: 3,
      expenseId: "EXP-2025-003",
      category: "Office Supplies",
      description: "Stationery and printing materials",
      amount: 2000,
      date: "2025-08-15",
      submittedBy: "Robert Johnson",
      status: "Approved"
    },
    {
      id: 4,
      expenseId: "EXP-2025-004",
      category: "Transport",
      description: "Vehicle fuel expenses",
      amount: 3000,
      date: "2025-08-16",
      submittedBy: "Emily Davis",
      status: "Rejected"
    },
    {
      id: 5,
      expenseId: "EXP-2025-005",
      category: "Accommodation",
      description: "Guest house stay for site supervisor",
      amount: 4000,
      date: "2025-08-18",
      submittedBy: "Michael Wilson",
      status: "Pending"
    }
  ];

  useEffect(() => {
    // Simulate API call with static data
    setExpenses(staticExpenses);
  }, []);

  return (
    <Container fluid className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Expense Sheet Management</h2>
        <Button variant="primary">Submit New Expense</Button>
      </div>
      
      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Expense ID</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount (₹)</th>
                <th>Date</th>
                <th>Submitted By</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={expense.id}>
                  <td>{index + 1}</td>
                  <td>{expense.expenseId}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td>{expense.amount.toLocaleString('en-IN')}</td>
                  <td>{expense.date}</td>
                  <td>{expense.submittedBy}</td>
                  <td>
                    <span className={`badge ${
                      expense.status === 'Approved' ? 'bg-success' : 
                      expense.status === 'Pending' ? 'bg-warning' : 
                      'bg-danger'
                    }`}>
                      {expense.status}
                    </span>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">View</Button>
                    <Button variant="outline-danger" size="sm">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewExpense;