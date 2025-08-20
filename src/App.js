import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/common/login";
import ViewUsers from "./component/users/ViewUsers";
import ViewRoles from "./component/Roles/ViewRoles";
import ViewSite from "./component/sites/ViewSite";
import ViewWorkOrder from "./component/WorkOrder/ViewWorkOrder";
import UploadWODocumentHome from "./component/WorkOrder/UploadWODocumentHome";
import Dashboard from "./component/Dashboard/Dashboard";
import PlanningDashboard from "./component/Dashboard/components/PlanningDashboard";
import SiteLevelDashboard from "./component/Dashboard/roles/SiteLevelDashboard";
import ManagementDashboard from "./component/Dashboard/roles/ManagementDashboard";
import RoleDashboard from "./component/Dashboard/roles/RoleDashboard";
import MainLayout from "./component/common/MainLayout";

// Import new components
import ViewTools from "./component/Tools/ViewTools";
import ViewChecklists from "./component/Checklist/ViewChecklists";
import ViewDPR from "./component/DPR/ViewDPR";
import ViewProcurement from "./component/Procurement/ViewProcurement";
import ViewAttendance from "./component/Attendance/ViewAttendance";
import ViewPayment from "./component/Payment/ViewPayment";
import ViewExpense from "./component/Expense/ViewExpense";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<PlanningDashboard />} />
            <Route path="dashboard" element={<PlanningDashboard />} />
            <Route path="dashboard/planning" element={<PlanningDashboard />} />
            <Route path="dashboard/site" element={<SiteLevelDashboard />} />
            <Route path="dashboard/management" element={<ManagementDashboard />} />
            <Route path="dashboard/role/:roleName" element={<RoleDashboard />} />
            <Route path="/users" element={<ViewUsers />} />
            <Route path="/roles" element={<ViewRoles />} />
            <Route path="/site" element={<ViewSite />} />
            <Route path="/work_order" element={<ViewWorkOrder />} />
            <Route path="/work_order/upload_excel" element={<UploadWODocumentHome />} />
            {/* New routes */}
            <Route path="/tools" element={<ViewTools />} />
            <Route path="/checklists" element={<ViewChecklists />} />
            <Route path="/dpr" element={<ViewDPR />} />
            <Route path="/procurement" element={<ViewProcurement />} />
            <Route path="/attendance" element={<ViewAttendance />} />
            <Route path="/payments" element={<ViewPayment />} />
            <Route path="/expenses" element={<ViewExpense />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
