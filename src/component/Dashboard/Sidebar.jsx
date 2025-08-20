import React from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ show, handleClose, role }) => {
  const location = useLocation();

  // Define modules based on role with the exact order requested
  const getModules = () => {
    // Planning module will be first for all roles
    const planningModule = [
      { name: "Planning", icon: "bi-calendar-check", path: "/dashboard/planning" },
    ];

    // Site-level roles modules in the requested order
    const siteModules = [
      { name: "User/Employee", icon: "bi-people", path: "/users" },
      { name: "Site", icon: "bi-building", path: "/site" },
      { name: "Work Order", icon: "bi-clipboard-check", path: "/work_order" },
      { name: "Role & Permissions", icon: "bi-shield-lock", path: "/roles" },
      { name: "Tools/Machinery/Equipment", icon: "bi-tools", path: "/tools" },
      { name: "Checklist", icon: "bi-list-check", path: "/checklists" },
      { name: "Measurement Details (DPR)", icon: "bi-card-checklist", path: "/dpr" },
      { name: "Procurement Order", icon: "bi-cart-check", path: "/procurement" },
      { name: "Attendance", icon: "bi-clock-history", path: "/attendance" },
      { name: "Payment", icon: "bi-currency-rupee", path: "/payments" },
      { name: "Expense Sheet", icon: "bi-wallet2", path: "/expenses" },
    ];

    // Combine modules with Planning first
    return [...planningModule, ...siteModules];
  };

  const modules = getModules();

  return (
    <>
      {/* Desktop Sidebar - Always visible on md and up */}
      <div className="d-none d-md-block bg-light sidebar">
        <div className="px-3 py-4">
          <h4 className="text-primary mb-4">UK ERP 1.0</h4>
          <div className="sidebar-nav">
            <Nav className="flex-column">
              {modules.map((module, index) => (
                <Nav.Link 
                  key={index}
                  as={Link} 
                  to={module.path}
                  className={location.pathname === module.path ? "active" : ""}
                >
                  <i className={`bi ${module.icon} me-2`}></i>
                  {module.name}
                </Nav.Link>
              ))}
            </Nav>
          </div>
        </div>
      </div>

      {/* Mobile Offcanvas */}
      <Offcanvas show={show} onHide={handleClose} className="d-md-none" placement="start" responsive={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>UK ERP 1.0</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {modules.map((module, index) => (
              <Nav.Link 
                key={index}
                as={Link} 
                to={module.path}
                className={location.pathname === module.path ? "active" : ""}
                onClick={handleClose}
              >
                <i className={`bi ${module.icon} me-2`}></i>
                {module.name}
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;