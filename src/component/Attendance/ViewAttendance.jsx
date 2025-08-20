import React, { useState, useEffect } from "react";
import { Container, Table, Button, Card } from "react-bootstrap";

const ViewAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Static data for attendance records
  const staticAttendanceRecords = [
    {
      id: 1,
      date: "2025-08-15",
      employeeName: "John Doe",
      employeeId: "EMP001",
      site: "Mumbai Site A",
      shift: "Day",
      status: "Present",
      inTime: "08:00 AM",
      outTime: "06:00 PM"
    },
    {
      id: 2,
      date: "2025-08-15",
      employeeName: "Jane Smith",
      employeeId: "EMP002",
      site: "Delhi Site B",
      shift: "Night",
      status: "Present",
      inTime: "08:00 PM",
      outTime: "06:00 AM"
    },
    {
      id: 3,
      date: "2025-08-15",
      employeeName: "Robert Johnson",
      employeeId: "EMP003",
      site: "Bangalore Site C",
      shift: "Day",
      status: "Absent",
      inTime: "-",
      outTime: "-"
    },
    {
      id: 4,
      date: "2025-08-15",
      employeeName: "Emily Davis",
      employeeId: "EMP004",
      site: "Chennai Site D",
      shift: "Day",
      status: "Present",
      inTime: "08:15 AM",
      outTime: "06:15 PM"
    },
    {
      id: 5,
      date: "2025-08-15",
      employeeName: "Michael Wilson",
      employeeId: "EMP005",
      site: "Kolkata Site E",
      shift: "Night",
      status: "Present",
      inTime: "08:00 PM",
      outTime: "05:45 AM"
    }
  ];

  useEffect(() => {
    // Simulate API call with static data
    setAttendanceRecords(staticAttendanceRecords);
  }, []);

  return (
    <Container fluid className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Attendance Management</h2>
        <Button variant="primary">Add Attendance Record</Button>
      </div>
      
      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Site</th>
                <th>Shift</th>
                <th>Status</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td>{record.date}</td>
                  <td>{record.employeeName}</td>
                  <td>{record.employeeId}</td>
                  <td>{record.site}</td>
                  <td>{record.shift}</td>
                  <td>
                    <span className={`badge ${
                      record.status === 'Present' ? 'bg-success' : 
                      'bg-danger'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td>{record.inTime}</td>
                  <td>{record.outTime}</td>
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

export default ViewAttendance;