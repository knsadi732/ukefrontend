import React, { useState } from "react";
import { Row, Col, Card, Button, Dropdown } from "react-bootstrap";

const PlanningDashboard = () => {
  const [selectedProject, setSelectedProject] = useState("Project A");
  const [timeRange, setTimeRange] = useState("This Month");

  // Mock data for demonstration
  const projects = ["Project A", "Project B", "Project C", "Project D"];
  const timeRanges = ["Today", "This Week", "This Month", "This Quarter", "This Year"];

  // KPI data
  const kpiData = [
    { title: "Total Projects", value: "24", change: "+12%", icon: "bi-building" },
    { title: "On Time", value: "18", change: "+5%", icon: "bi-check-circle" },
    { title: "Delayed", value: "3", change: "-2%", icon: "bi-exclamation-circle" },
    { title: "Budget Utilization", value: "78%", change: "+3%", icon: "bi-currency-rupee" },
  ];

  // Upcoming milestones
  const milestones = [
    { project: "Project A", task: "Foundation Completion", date: "2025-08-25", status: "on-track" },
    { project: "Project B", task: "Structural Framework", date: "2025-09-01", status: "at-risk" },
    { project: "Project C", task: "Electrical Installation", date: "2025-09-10", status: "on-track" },
    { project: "Project D", task: "Plumbing Work", date: "2025-09-15", status: "delayed" },
  ];

  // Gantt chart data
  const ganttData = [
    { task: "Site Preparation", start: "2025-08-01", end: "2025-08-10", progress: 100, assignee: "John Smith" },
    { task: "Foundation Work", start: "2025-08-08", end: "2025-08-25", progress: 75, assignee: "Robert Johnson" },
    { task: "Structural Framework", start: "2025-08-20", end: "2025-09-15", progress: 40, assignee: "Sarah Williams" },
    { task: "Electrical Installation", start: "2025-09-10", end: "2025-09-30", progress: 0, assignee: "Michael Brown" },
    { task: "Plumbing Work", start: "2025-09-15", end: "2025-10-05", progress: 0, assignee: "David Wilson" },
  ];

  // Resource allocation data
  const resourceData = [
    { resource: "Skilled Workers", allocated: 15, available: 20, utilization: 75 },
    { resource: "Equipment", allocated: 8, available: 12, utilization: 67 },
    { resource: "Vehicles", allocated: 5, available: 7, utilization: 71 },
    { resource: "Materials", allocated: 100, available: 120, utilization: 83 },
  ];

  // Planned vs Actual data
  const progressData = [
    { week: "Week 1", planned: 15, actual: 12 },
    { week: "Week 2", planned: 30, actual: 28 },
    { week: "Week 3", planned: 45, actual: 40 },
    { week: "Week 4", planned: 60, actual: 55 },
    { week: "Week 5", planned: 75, actual: 68 },
    { week: "Week 6", planned: 90, actual: 82 },
    { week: "Week 7", planned: 100, actual: 90 },
  ];

  return (
    <div className="planning-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-3">
        <h2 className="mb-0">Planning Dashboard</h2>
        <div className="d-flex gap-2 flex-wrap w-100 w-md-auto justify-content-center justify-content-md-end">
          <div className="d-flex gap-2">
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" size="sm" className="d-flex align-items-center">
                <i className="bi bi-building me-1"></i>
                <span className="d-none d-sm-inline">{selectedProject}</span>
                <span className="d-sm-none">Project</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {projects.map((project, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => setSelectedProject(project)}
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-building me-2"></i>
                    {project}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" size="sm" className="d-flex align-items-center">
                <i className="bi bi-calendar-range me-1"></i>
                <span className="d-none d-sm-inline">{timeRange}</span>
                <span className="d-sm-none">Time</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {timeRanges.map((range, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => setTimeRange(range)}
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-calendar-range me-2"></i>
                    {range}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Button variant="primary" onClick={(e) => { e.stopPropagation(); console.log("New Plan button clicked"); }} size="sm" className="d-flex align-items-center">
            <i className="bi bi-plus-lg me-1"></i>
            <span className="">New Plan</span>
            {/* <span className="d-sm-none">+</span> */}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <Row className="mb-4">
        {kpiData.map((kpi, index) => (
          <Col xxl={3} xl={3} lg={6} md={6} sm={12} xs={12} key={index} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-muted">{kpi.title}</h6>
                    <h3>{kpi.value}</h3>
                    <span className="text-success">{kpi.change}</span>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-1 rounded-circle kpi-icon-container flex-shrink-0">
                    <i className={`bi ${kpi.icon} text-primary fs-5 fs-md-4`}></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        {/* Gantt Chart */}
        <Col lg={8} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Gantt Chart</span>
              <div>
                <Button variant="outline-primary" size="sm" className="me-2" onClick={(e) => { e.stopPropagation(); console.log("Export Gantt Chart clicked"); }}>
                  <i className="bi bi-download"></i> Export
                </Button>
                <Button variant="outline-primary" size="sm" onClick={(e) => { e.stopPropagation(); console.log("Filter Gantt Chart clicked"); }}>
                  <i className="bi bi-funnel"></i> Filter
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="gantt-chart-container">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Task</th>
                        <th>Assignee</th>
                        <th>Timeline</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ganttData.map((task, index) => (
                        <tr key={index}>
                          <td>{task.task}</td>
                          <td>{task.assignee}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <small className="text-muted me-2">{task.start}</small>
                              <div className="progress flex-grow-1 mx-2" style={{ height: "8px" }}>
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: `${task.progress}%` }}
                                  aria-valuenow={task.progress}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <small className="text-muted ms-2">{task.end}</small>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="progress flex-grow-1 me-2" style={{ height: "12px" }}>
                                <div
                                  className={`progress-bar ${task.progress === 100 ? "bg-success" :
                                    task.progress >= 70 ? "bg-primary" :
                                      "bg-warning"
                                    }`}
                                  role="progressbar"
                                  style={{ width: `${task.progress}%` }}
                                  aria-valuenow={task.progress}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <span>{task.progress}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Upcoming Milestones */}
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header>Upcoming Milestones</Card.Header>
            <Card.Body>
              <div className="list-group list-group-flush">
                {milestones.map((milestone, index) => (
                  <div key={index} className="list-group-item px-0 py-3 border-0">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h6 className="mb-1">{milestone.task}</h6>
                        <p className="mb-1 text-muted">{milestone.project}</p>
                        <small className="text-muted">
                          <i className="bi bi-calendar me-1"></i>
                          {milestone.date}
                        </small>
                      </div>
                      <div>
                        <span className={`badge ${milestone.status === "on-track" ? "bg-success" :
                          milestone.status === "at-risk" ? "bg-warning" :
                            "bg-danger"
                          }`}>
                          {milestone.status.replace("-", " ")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Resource Allocation and Progress Comparison */}
      <Row className="mb-4">
        {/* Resource Allocation */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Resource Allocation</span>
              <Button variant="outline-primary" size="sm" onClick={(e) => { e.stopPropagation(); console.log("Export Resource Allocation clicked"); }}>
                <i className="bi bi-download"></i> Export
              </Button>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Resource</th>
                      <th>Allocated</th>
                      <th>Available</th>
                      <th>Utilization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resourceData.map((resource, index) => (
                      <tr key={index}>
                        <td>{resource.resource}</td>
                        <td>{resource.allocated}</td>
                        <td>{resource.available}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="progress flex-grow-1 me-2" style={{ height: "8px" }}>
                              <div
                                className={`progress-bar ${resource.utilization >= 90 ? "bg-danger" :
                                  resource.utilization >= 75 ? "bg-warning" :
                                    "bg-success"
                                  }`}
                                role="progressbar"
                                style={{ width: `${resource.utilization}%` }}
                                aria-valuenow={resource.utilization}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <span>{resource.utilization}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Planned vs Actual */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Planned vs Actual Progress</span>
              <Button variant="outline-primary" size="sm" onClick={(e) => { e.stopPropagation(); console.log("Export Planned vs Actual clicked"); }}>
                <i className="bi bi-download"></i> Export
              </Button>
            </Card.Header>
            <Card.Body>
              <div className="progress-comparison-chart">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Week</th>
                        <th>Planned</th>
                        <th>Actual</th>
                        <th>Variance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {progressData.map((data, index) => (
                        <tr key={index}>
                          <td>{data.week}</td>
                          <td>{data.planned}%</td>
                          <td>{data.actual}%</td>
                          <td>
                            <span className={data.actual >= data.planned ? "text-success" : "text-danger"}>
                              {data.actual - data.planned}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlanningDashboard;