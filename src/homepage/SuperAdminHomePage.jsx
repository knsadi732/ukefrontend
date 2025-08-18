import React, { useEffect } from "react";
// import ErrorHandler from "../common/ErrorHandler";
import "../css/blocks.css";
import CardBlock from "../component/common/CardBlock";
import ErrorHandler from "../component/common/ErrorHandler";

const SuperAdminHomePage = () => {
  useEffect(() => {
    document.title = "Admin Home";
  }, []);
  try {
    return (
      <>
        <div className="container container-body">
          <CardBlock name="Users" to="/users" />
          <CardBlock name="Role" to="/roles" />
          <CardBlock name="Site" to="/site" />
        </div>
      </>
    );
  } catch (error) {
    return <ErrorHandler error={error} />;
  }
};

export default SuperAdminHomePage;
