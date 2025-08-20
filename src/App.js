import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './common/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Module pages
import UserList from './pages/users/UserList';
import UserForm from './pages/users/UserForm';
import SiteList from './pages/sites/SiteList';
import SiteForm from './pages/sites/SiteForm';
import WorkOrderList from './pages/work-orders/WorkOrderList';
import WorkOrderForm from './pages/work-orders/WorkOrderForm';
import ToolList from './pages/tools/ToolList';
import ToolForm from './pages/tools/ToolForm';
import ChecklistList from './pages/checklists/ChecklistList';
import ChecklistForm from './pages/checklists/ChecklistForm';
import DprList from './pages/dpr/DprList';
import DprForm from './pages/dpr/DprForm';
import ProcurementList from './pages/procurement/ProcurementList';
import ProcurementForm from './pages/procurement/ProcurementForm';
import AttendanceList from './pages/attendance/AttendanceList';
import AttendanceForm from './pages/attendance/AttendanceForm';
import PaymentList from './pages/payments/PaymentList';
import PaymentForm from './pages/payments/PaymentForm';
import ExpenseList from './pages/expenses/ExpenseList';
import ExpenseForm from './pages/expenses/ExpenseForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          
          {/* Users Routes */}
          <Route path="users" element={<UserList />} />
          <Route path="users/new" element={<UserForm />} />
          <Route path="users/:id/edit" element={<UserForm />} />
          
          {/* Sites Routes */}
          <Route path="sites" element={<SiteList />} />
          <Route path="sites/new" element={<SiteForm />} />
          <Route path="sites/:id/edit" element={<SiteForm />} />
          
          {/* Work Orders Routes */}
          <Route path="work-orders" element={<WorkOrderList />} />
          <Route path="work-orders/new" element={<WorkOrderForm />} />
          <Route path="work-orders/:id/edit" element={<WorkOrderForm />} />
          
          {/* Tools Routes */}
          <Route path="tools" element={<ToolList />} />
          <Route path="tools/new" element={<ToolForm />} />
          <Route path="tools/:id/edit" element={<ToolForm />} />
          
          {/* Checklists Routes */}
          <Route path="checklists" element={<ChecklistList />} />
          <Route path="checklists/new" element={<ChecklistForm />} />
          <Route path="checklists/:id/edit" element={<ChecklistForm />} />
          
          {/* DPR Routes */}
          <Route path="dpr" element={<DprList />} />
          <Route path="dpr/new" element={<DprForm />} />
          <Route path="dpr/:id/edit" element={<DprForm />} />
          
          {/* Procurement Routes */}
          <Route path="procurement" element={<ProcurementList />} />
          <Route path="procurement/new" element={<ProcurementForm />} />
          <Route path="procurement/:id/edit" element={<ProcurementForm />} />
          
          {/* Attendance Routes */}
          <Route path="attendance" element={<AttendanceList />} />
          <Route path="attendance/new" element={<AttendanceForm />} />
          <Route path="attendance/:id/edit" element={<AttendanceForm />} />
          
          {/* Payments Routes */}
          <Route path="payments" element={<PaymentList />} />
          <Route path="payments/new" element={<PaymentForm />} />
          <Route path="payments/:id/edit" element={<PaymentForm />} />
          
          {/* Expenses Routes */}
          <Route path="expenses" element={<ExpenseList />} />
          <Route path="expenses/new" element={<ExpenseForm />} />
          <Route path="expenses/:id/edit" element={<ExpenseForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;