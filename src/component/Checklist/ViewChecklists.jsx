import React, { useState, useEffect } from "react";
import { Container, Table, Button, Card } from "react-bootstrap";

const ViewChecklists = () => {
  const [checklists, setChecklists] = useState([]);

  // Static data for checklists
  const staticChecklists = [
    {
      id: 1,
      name: "Daily Safety Inspection",
      category: "Safety",
      frequency: "Daily",
      site: "All Sites",
      status: "Active"
    },
    {
      id: 2,
      name: "Weekly Equipment Check",
      category: "Maintenance",
      frequency: "Weekly",
      site: "Mumbai Site A",
      status: "Active"
    },
    {
      id: 3,
      name: "Monthly Site Audit",
      category: "Compliance",
      frequency: "Monthly",
      site: "Delhi Site B",
      status: "Inactive"
    },
    {
      id: 4,
      name: "Pre-Work Inspection",
      category: "Safety",
      frequency: "Before each task",
      site: "Bangalore Site C",
      status: "Active"
    },
    {
      id: 5,
      name: "Quarterly Review",
      category: "Performance",
      frequency: "Quarterly",
      site: "All Sites",
      status: "Active"
    }
  ];

  useEffect(() => {
    // Simulate API call with static data
    setChecklists(staticChecklists);
  }, []);

  return (
    <Container fluid className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Checklist Management</h2>
        <Button variant="primary">Add New Checklist</Button>
      </div>
      
      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Checklist Name</th>
                <th>Category</th>
                <th>Frequency</th>
                <th>Assigned Site</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {checklists.map((checklist, index) => (
                <tr key={checklist.id}>
                  <td>{index + 1}</td>
                  <td>{checklist.name}</td>
                  <td>{checklist.category}</td>
                  <td>{checklist.frequency}</td>
                  <td>{checklist.site}</td>
                  <td>
                    <span className={`badge ${checklist.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                      {checklist.status}
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

export default ViewChecklists;