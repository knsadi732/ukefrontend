import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <Sidebar
        show={showSidebar}
        handleClose={() => setShowSidebar(false)}
        role="Site Admin"
      />

      {/* Main Content - Navbar is now provided by MainLayout */}
      {/* <div className="main-content d-flex"> */}
      <div className="sidebar-spacer d-none d-md-block" style={{ width: "250px", flexShrink: 0 }}></div>
      <Container fluid className="p-3 dashboard-content flex-grow-1">
        <Outlet />
      </Container>
      {/* </div> */}
    </>
  );
};

export default Dashboard;