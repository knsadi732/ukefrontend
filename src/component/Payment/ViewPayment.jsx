import React, { useState, useEffect } from "react";
import { Container, Table, Button, Card } from "react-bootstrap";

const ViewPayment = () => {
  const [payments, setPayments] = useState([]);

  // Static data for payments
  const staticPayments = [
    {
      id: 1,
      paymentId: "PAY-2025-001",
      employeeName: "John Doe",
      employeeId: "EMP001",
      amount: 25000,
      paymentDate: "2025-08-05",
      paymentMethod: "Bank Transfer",
      status: "Processed"
    },
    {
      id: 2,
      paymentId: "PAY-2025-002",
      employeeName: "Jane Smith",
      employeeId: "EMP002",
      amount: 30000,
      paymentDate: "2025-08-05",
      paymentMethod: "Bank Transfer",
      status: "Processed"
    },
    {
      id: 3,
      paymentId: "PAY-2025-003",
      employeeName: "Robert Johnson",
      employeeId: "EMP003",
      amount: 20000,
      paymentDate: "2025-08-05",
      paymentMethod: "Cheque",
      status: "Pending"
    },
    {
      id: 4,
      paymentId: "PAY-2025-004",
      employeeName: "Emily Davis",
      employeeId: "EMP004",
      amount: 28000,
      paymentDate: "2025-08-05",
      paymentMethod: "Bank Transfer",
      status: "Processed"
    },
    {
      id: 5,
      paymentId: "PAY-2025-005",
      employeeName: "Michael Wilson",
      employeeId: "EMP005",
      amount: 32000,
      paymentDate: "2025-08-05",
      paymentMethod: "Cash",
      status: "Processed"
    }
  ];

  useEffect(() => {
    // Simulate API call with static data
    setPayments(staticPayments);
  }, []);

  return (
    <Container fluid className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Payment Management</h2>
        <Button variant="primary">Process New Payment</Button>
      </div>
      
      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Payment ID</th>
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Amount (₹)</th>
                <th>Payment Date</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment.id}>
                  <td>{index + 1}</td>
                  <td>{payment.paymentId}</td>
                  <td>{payment.employeeName}</td>
                  <td>{payment.employeeId}</td>
                  <td>{payment.amount.toLocaleString('en-IN')}</td>
                  <td>{payment.paymentDate}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>
                    <span className={`badge ${
                      payment.status === 'Processed' ? 'bg-success' : 
                      'bg-warning'
                    }`}>
                      {payment.status}
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

export default ViewPayment;