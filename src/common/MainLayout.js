import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Offcanvas, Button } from 'react-bootstrap';
import { FaBars, FaTachometerAlt, FaUsers, FaBuilding, FaTasks, FaTools, FaClipboardCheck, FaRuler, FaShoppingCart, FaCalendarAlt, FaMoneyBillWave, FaFileInvoice } from 'react-icons/fa';

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/' },
    { name: 'Users', icon: <FaUsers />, path: '/users' },
    { name: 'Sites', icon: <FaBuilding />, path: '/sites' },
    { name: 'Work Orders', icon: <FaTasks />, path: '/work-orders' },
    { name: 'Tools & Equipment', icon: <FaTools />, path: '/tools' },
    { name: 'Checklists', icon: <FaClipboardCheck />, path: '/checklists' },
    { name: 'DPR', icon: <FaRuler />, path: '/dpr' },
    { name: 'Procurement', icon: <FaShoppingCart />, path: '/procurement' },
    { name: 'Attendance', icon: <FaCalendarAlt />, path: '/attendance' },
    { name: 'Payments', icon: <FaMoneyBillWave />, path: '/payments' },
    { name: 'Expenses', icon: <FaFileInvoice />, path: '/expenses' },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand={false} className="mb-3">
        <Container fluid>
          <Button 
            variant="outline-light" 
            onClick={() => setShowSidebar(true)}
            className="me-2"
          >
            <FaBars />
          </Button>
          <Navbar.Brand href="/">UK ERP System</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Sidebar Offcanvas */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>UK ERP System</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {navItems.map((item, index) => (
              <Nav.Link 
                key={index} 
                href={item.path} 
                className="d-flex align-items-center mb-2"
                onClick={() => setShowSidebar(false)}
              >
                <span className="me-2">{item.icon}</span>
                {item.name}
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <Container fluid className="flex-grow-1">
        <Outlet />
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3 mt-4">
        <Container>
          <p className="mb-0">© 2025 UK ERP System - All Rights Reserved</p>
        </Container>
      </footer>
    </div>
  );
};

export default MainLayout;