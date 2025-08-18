import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
// import { showNavbarSearchURL } from "../helpers/contants";

const NavBar = () => {
  const [search, setSearch] = useState("");

  const location = useLocation();
  const [showSearchBox, setShowSearchBox] = useState(false);
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1020);
  const [searchToggle, setSearchToggle] = useState(false);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 1020);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    navigate("/login");
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = (e) => {
    if (search?.value !== "" && search?.value !== undefined) {
      navigate(`/search?search=${search.value}`);
    }
  };

  const handleChangeSearch = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({
      ...prev,
      value,
    }));
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const currentPageURL = window.location.pathname;


  return (
    <>
         <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className=" container-fluid px-2">
          <Link
            className="navbar-brand"
            to="/"
            style={{ backgroundColor: "transparent" }}
          >
            <img
              // src={ACPLLOGO}
              alt="UKE"
              style={{
                height: "2rem",
                width: "auto",
                mixBlendMode: "multiply",
              }}
            />
          </Link>
          {isSmallScreen && (
            <div
              style={{
                marginLeft: "auto",
                marginRight: "2rem",
                fontSize: "x-large",
              }}
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <FaSearch onClick={() => setSearchToggle(true)} />
                </li>
              </ul>
            </div>
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav px-1">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    currentPageURL === "/" ? "active fw-semibold" : ""
                  }`}
                  href="/"
                >
                  Home
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <>
                {location?.pathname !== "/login" && (
                  <li className="nav-item ps-2">
                    <Link className=" btn btn-success" to="/login">
                      Login
                    </Link>
                  </li>
                )}
              </>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
