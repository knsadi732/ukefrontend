import { Route, Routes } from "react-router-dom"; // Import Routes and Route
import "./App.css";
import Navbar from "./common/Navbar";
import Login from "./component/common/login";
import ViewUsers from "./component/users/ViewUsers";
import ViewRoles from "./component/Roles/ViewRoles";
import ViewSite from "./component/site/ViewSite";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/users" element={<ViewUsers />} />
        <Route exact path="/roles" element={<ViewRoles />} />
        <Route exact path="/site" element={<ViewSite />} />
      </Routes>
    </div>
  );
}

export default App;
