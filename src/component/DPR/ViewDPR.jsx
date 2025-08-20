import React, { useState, useEffect } from "react";
import { Container, Table, Button, Card } from "react-bootstrap";

const ViewDPR = () => {
  const [dprRecords, setDprRecords] = useState([]);

  // Static data for DPR records
  const staticDprRecords = [
    {
      id: 1,
      date: "2025-08-15",
      site: "Mumbai Site A",
      workDescription: "Excavation for foundation",
      unit: "Cubic Meters",
      planned: 150,
      achieved: 145,
      variance: -5,
      status: "Completed"
    },
    {
      id: 2,
      date: "2025-08-16",
      site: "Delhi Site B",
      workDescription: "Concrete pouring for columns",
      unit: "Cubic Meters",
      planned: 80,
      achieved: 85,
      variance: 5,
      status: "Completed"
    },
    {
      id: 3,
      date: "2025-08-17",
      site: "Bangalore Site C",
      workDescription: "Brickwork for walls",
      unit: "Square Meters",
      planned: 200,
      achieved: 180,
      variance: -20,
      status: "In Progress"
    },
    {
      id: 4,
      date: "2025-08-18",
      site: "Chennai Site D",
      workDescription: "Electrical wiring installation",
      unit: "Meters",
      planned: 500,
      achieved: 450,
      variance: -50,
      status: "In Progress"
    },
    {
      id: 5,
      date: "2025-08-19",
      site: "Kolkata Site E",
      workDescription: "Plumbing work",
      unit: "Meters",
      planned: 300,
      achieved: 310,
      variance: 10,
      status: "Completed"
    }
  ];

  useEffect(() => {
    // Simulate API call with static data
    setDprRecords(staticDprRecords);
  }, []);

  return (
    <Container fluid className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Measurement Details (DPR) Management</h2>
        <Button variant="primary">Add New DPR Record</Button>
      </div>
      
      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Site</th>
                <th>Work Description</th>
                <th>Unit</th>
                <th>Planned</th>
                <th>Achieved</th>
                <th>Variance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dprRecords.map((record, index) => (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td>{record.date}</td>
                  <td>{record.site}</td>
                  <td>{record.workDescription}</td>
                  <td>{record.unit}</td>
                  <td>{record.planned}</td>
                  <td>{record.achieved}</td>
                  <td>{record.variance}</td>
                  <td>
                    <span className={`badge ${
                      record.status === 'Completed' ? 'bg-success' : 
                      record.status === 'In Progress' ? 'bg-primary' : 
                      'bg-warning'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
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

export default ViewDPR;