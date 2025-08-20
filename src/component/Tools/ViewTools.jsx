import React, { useState, useEffect } from "react";
import { Container, Table, Button, Card, Row, Col } from "react-bootstrap";

const ViewTools = () => {
  const [tools, setTools] = useState([]);

  // Static data for tools
  const staticTools = [
    {
      id: 1,
      name: "Excavator",
      type: "Heavy Machinery",
      model: "CAT 320D",
      site: "Mumbai Site A",
      status: "In Use"
    },
    {
      id: 2,
      name: "Concrete Mixer",
      type: "Construction Equipment",
      model: "JS-500",
      site: "Delhi Site B",
      status: "Available"
    },
    {
      id: 3,
      name: "Power Drill",
      type: "Hand Tools",
      model: "DeWalt DCD771",
      site: "Bangalore Site C",
      status: "Maintenance"
    },
    {
      id: 4,
      name: "Forklift",
      type: "Material Handling",
      model: "Toyota 8FDU15",
      site: "Chennai Site D",
      status: "In Use"
    },
    {
      id: 5,
      name: "Welding Machine",
      type: "Industrial Equipment",
      model: "Lincoln Electric K7500",
      site: "Kolkata Site E",
      status: "Available"
    }
  ];

  useEffect(() => {
    // Simulate API call with static data
    setTools(staticTools);
  }, []);

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Tools/Machinery/Equipment Management</h2>
            <Button variant="primary">Add New Tool</Button>
          </div>
          
          <Card className="shadow-sm">
            <Card.Body>
              <Table striped bordered hover responsive className="mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tool Name</th>
                    <th>Type</th>
                    <th>Model</th>
                    <th>Assigned Site</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map((tool, index) => (
                    <tr key={tool.id}>
                      <td>{index + 1}</td>
                      <td>{tool.name}</td>
                      <td>{tool.type}</td>
                      <td>{tool.model}</td>
                      <td>{tool.site}</td>
                      <td>
                        <span className={`badge ${
                          tool.status === 'Available' ? 'bg-success' : 
                          tool.status === 'In Use' ? 'bg-primary' : 
                          'bg-warning'
                        }`}>
                          {tool.status}
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
        </Col>
      </Row>
    </Container>
  );
};

export default ViewTools;