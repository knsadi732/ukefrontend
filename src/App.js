import { Route, Routes } from "react-router-dom"; // Import Routes and Route
import "./App.css";
import Navbar from "./common/Navbar";
import Login from "./component/common/login";
import ViewUsers from "./component/users/ViewUsers";
import ViewRoles from "./component/Roles/ViewRoles";
import ViewSite from "./component/sites/ViewSite";
import ViewWorkOrder from "./component/WorkOrder/ViewWorkOrder";
import UploadWODocumentHome from "./component/WorkOrder/UploadWODocumentHome";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
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
