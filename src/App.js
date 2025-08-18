import { Route, Routes, useNavigate } from "react-router-dom"; // Import Routes and Route
import "./App.css";
import Navbar from "./common/Navbar";
import Login from "./component/common/login";
import ViewUsers from "./component/users/ViewUsers";
import ViewRoles from "./component/Roles/ViewRoles";
import ViewSite from "./component/sites/ViewSite";
import ViewWorkOrder from "./component/WorkOrder/ViewWorkOrder";
import UploadWODocumentHome from "./component/WorkOrder/UploadWODocumentHome";
import { jwtDecode } from "jwt-decode";
import SuperAdminNavBar from "./common/SuperAdminNavBar";
import NavBar from "./common/Navbar";
import SuperAdminHomePage from "./homepage/SuperAdminHomePage";


function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  let user;
  let user_role;

  if (token) {
    user = jwtDecode(token);
    user_role = localStorage.getItem("user_role");
  }

  function RenderNavbar() {
    user_role = localStorage.getItem("role_name");
    if (user_role === "Admin" || user_role === "Senior Manager") {
      // return <AdminNavBar />;
    } else if (user_role === "Super Admin") {
      return <SuperAdminNavBar />;
    } else {
      return <NavBar />;
    }
  }

  return (
    <div className="App">
      <RenderNavbar />
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/" element={<SuperAdminHomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/users" element={<ViewUsers />} />
        <Route exact path="/roles" element={<ViewRoles />} />
        <Route exact path="/site" element={<ViewSite />} />
        <Route exact path="/work_order" element={<ViewWorkOrder />} />
        <Route
          exact
          path="/work_order/upload_excel"
          element={<UploadWODocumentHome />}
        />
      </Routes>
    </div>
  );
}

export default App;
