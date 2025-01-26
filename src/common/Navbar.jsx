import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navHamburgerBtn = useRef(null);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            UKE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            ref={navHamburgerBtn}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/site">
                  Site
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/work_order">
                  Work Order
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`/roles`}
                  onClick={() => {
                    window.innerWidth < 992 && navHamburgerBtn.current.click();
                  }}
                >
                  Roles
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`/login`}
                  onClick={() => {
                    window.innerWidth < 992 && navHamburgerBtn.current.click();
                  }}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
