import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { 
  FaUsers, FaBuilding, FaTasks, FaTools, 
  FaClipboardCheck, FaRuler, FaShoppingCart, 
  FaCalendarAlt, FaMoneyBillWave, FaFileInvoice 
} from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    sites: 0,
    workOrders: 0,
    tools: 0,
    checklists: 0,
    dprRecords: 0,
    procurementOrders: 0,
    attendanceRecords: 0,
    payments: 0,
    expenses: 0
  });

  // In a real application, you would fetch these stats from your API
  useEffect(() => {
    // Simulating API call with mock data
    setStats({
      users: 42,
      sites: 12,
      workOrders: 28,
      tools: 156,
      checklists: 24,
      dprRecords: 142,
      procurementOrders: 36,
      attendanceRecords: 210,
      payments: 89,
      expenses: 67
    });
  }, []);

  const statCards = [
    { title: 'Users', value: stats.users, icon: <FaUsers />, color: 'primary' },
    { title: 'Sites', value: stats.sites, icon: <FaBuilding />, color: 'success' },
    { title: 'Work Orders', value: stats.workOrders, icon: <FaTasks />, color: 'info' },
    { title: 'Tools', value: stats.tools, icon: <FaTools />, color: 'warning' },
    { title: 'Checklists', value: stats.checklists, icon: <FaClipboardCheck />, color: 'danger' },
    { title: 'DPR Records', value: stats.dprRecords, icon: <FaRuler />, color: 'secondary' },
    { title: 'Procurement', value: stats.procurementOrders, icon: <FaShoppingCart />, color: 'primary' },
    { title: 'Attendance', value: stats.attendanceRecords, icon: <FaCalendarAlt />, color: 'success' },
    { title: 'Payments', value: stats.payments, icon: <FaMoneyBillWave />, color: 'info' },
    { title: 'Expenses', value: stats.expenses, icon: <FaFileInvoice />, color: 'warning' }
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the UK ERP System Dashboard</p>
      
      <Row>
        {statCards.map((stat, index) => (
          <Col key={index} md={6} lg={4} xl={3} className="mb-4">
            <Card className="border-left-primary shadow h-100 py-2">
              <Card.Body>
                <Row className="no-gutters align-items-center">
                  <Col className="mr-2">
                    <div className="text-xs font-weight-bold text-uppercase mb-1">
                      {stat.title}
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {stat.value}
                    </div>
                  </Col>
                  <Col className="col-auto">
                    <div className={`text-primary h3`}>
                      {stat.icon}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header>Recent Activity</Card.Header>
            <Card.Body>
              <p>Your recent activities will appear here.</p>
              <Button variant="primary">View All Activity</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>System Status</Card.Header>
            <Card.Body>
              <p>All systems are operational.</p>
              <Button variant="success">View System Reports</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;