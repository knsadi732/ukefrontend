import React, { useState, useEffect } from "react";
import { Container, Table, Button, Card } from "react-bootstrap";

const ViewProcurement = () => {
  const [procurements, setProcurements] = useState([]);

  // Static data for procurement orders
  const staticProcurements = [
    {
      id: 1,
      poNumber: "PO-2025-001",
      vendor: "ABC Construction Materials",
      item: "Cement",
      quantity: 500,
      unit: "Bags",
      site: "Mumbai Site A",
      orderDate: "2025-08-10",
      expectedDelivery: "2025-08-20",
      status: "Pending"
    },
    {
      id: 2,
      poNumber: "PO-2025-002",
      vendor: "XYZ Steel Suppliers",
      item: "Steel Rods",
      quantity: 2000,
      unit: "Kgs",
      site: "Delhi Site B",
      orderDate: "2025-08-12",
      expectedDelivery: "2025-08-22",
      status: "Shipped"
    },
    {
      id: 3,
      poNumber: "PO-2025-003",
      vendor: "PQR Sand & Aggregate",
      item: "Sand",
      quantity: 100,
      unit: "Cubic Meters",
      site: "Bangalore Site C",
      orderDate: "2025-08-15",
      expectedDelivery: "2025-08-25",
      status: "Delivered"
    },
    {
      id: 4,
      poNumber: "PO-2025-004",
      vendor: "LMN Bricks & Blocks",
      item: "Concrete Blocks",
      quantity: 5000,
      unit: "Pieces",
      site: "Chennai Site D",
      orderDate: "2025-08-16",
      expectedDelivery: "2025-08-26",
      status: "Pending"
    },
    {
      id: 5,
      poNumber: "PO-2025-005",
      vendor: "EFG Paints & Chemicals",
      item: "Paint",
      quantity: 200,
      unit: "Liters",
      site: "Kolkata Site E",
      orderDate: "2025-08-18",
      expectedDelivery: "2025-08-28",
      status: "Shipped"
    }
  ];

  useEffect(() => {
    // Simulate API call with static data
    setProcurements(staticProcurements);
  }, []);

  return (
    <Container fluid className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Procurement Order Management</h2>
        <Button variant="primary">Create New Procurement Order</Button>
      </div>
      
      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>PO Number</th>
                <th>Vendor</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Site</th>
                <th>Order Date</th>
                <th>Expected Delivery</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {procurements.map((procurement, index) => (
                <tr key={procurement.id}>
                  <td>{index + 1}</td>
                  <td>{procurement.poNumber}</td>
                  <td>{procurement.vendor}</td>
                  <td>{procurement.item}</td>
                  <td>{procurement.quantity} {procurement.unit}</td>
                  <td>{procurement.site}</td>
                  <td>{procurement.orderDate}</td>
                  <td>{procurement.expectedDelivery}</td>
                  <td>
                    <span className={`badge ${
                      procurement.status === 'Delivered' ? 'bg-success' : 
                      procurement.status === 'Shipped' ? 'bg-primary' : 
                      'bg-warning'
                    }`}>
                      {procurement.status}
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

export default ViewProcurement;