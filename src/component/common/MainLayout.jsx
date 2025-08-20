import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import '../Dashboard/Dashboard.css'; // Corrected path to CSS file

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="primary" variant="dark" expand="md" className="shadow-sm main-navbar">
        <Container fluid>
          <Navbar.Brand href="/" className="fw-bold">
            UK ERP 1.0
          </Navbar.Brand>
          <Nav className="me-auto">
            {/* Add any additional navbar items here if needed */}
          </Nav>
          
          {/* User Menu */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
              <i className="bi bi-person-circle"></i> Admin User
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/profile">
                <i className="bi bi-person me-2"></i>Profile
              </Dropdown.Item>
              <Dropdown.Item href="#/settings">
                <i className="bi bi-gear me-2"></i>Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/logout">
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          <Button 
            variant="outline-light" 
            className="d-md-none ms-2" 
            onClick={() => setSidebarOpen(true)}
          >
            <i className="bi bi-list"></i>
          </Button>
        </Container>
      </Navbar>

      {/* Page Content */}
      <div className="d-flex">
        {/* Sidebar placeholder - will be rendered by Dashboard component */}
        <div className="sidebar-spacer d-none d-md-block" style={{ width: "250px", flexShrink: 0 }}></div>
        <div className="flex-grow-1">
          <Outlet /> {/* This will render nested routes */}
        </div>
      </div>
    </>
  );
};

export default MainLayout;