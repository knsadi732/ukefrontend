import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { showNavbarSearchURL } from "../helpers/contants";
// import { errorToast } from "../react-toastfiy/toast";

const SuperAdminNavBar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1020);
  const [search, setSearch] = useState("");
  const [searchToggle, setSearchToggle] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("accessToken");
  const user_role = localStorage.getItem("role_name");

 

  useEffect(() => {
  
    if (isLoggedIn && user_role === "Super Admin") {
      try {
        const decodedUser = jwtDecode(isLoggedIn);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.clear();
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const logout = async () => {
    try {
      localStorage.clear();
      window.location.replace("/login");
    } catch (error) {
      console.error(error);
      // errorToast(error?.message);
    }
  };
  const navHamburgerBtn = useRef(null);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 1020);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = (e) => {
    if (search?.value !== "" && search?.value !== undefined) {
      navigate(`/search?search=${search.value}`);
      setSearchToggle(false);
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

  // useEffect(() => {
  //   if (showNavbarSearchURL.includes(location?.pathname)) {
  //     setShowSearchBox(true);
  //   }
  // }, [location]);

  return (
    <>
      {/* {searchToggle && (
        <HomePageModelSearch
          handleChangeSearch={handleChangeSearch}
          handleSearch={handleSearch}
          setModal={setSearchToggle}
          show={searchToggle}
          onHide={() => {
            setSearchToggle(false);
          }}
        />
      )} */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className=" container-fluid px-2">
          <Link className="navbar-brand" to="/super-admin/home">
            <img
            //   src={ACPLLOGO}
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
            ref={navHamburgerBtn}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <span
                  style={{ cursor: "pointer" }}
                  className={`nav-link ${
                    currentPageURL === "/" ? "active fw-semibold" : ""
                  }`}
                  aria-current="page"
                  onClick={() => {
                    window.innerWidth < 992 && navHamburgerBtn.current.click();
                    window.location.replace("/");
                  }}
                >
                  Home
                </span>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currentPageURL === "/users" ? "active fw-semibold" : ""
                  }`} // aria-current="page"
                  to="/users"
                  onClick={() => {
                    window.innerWidth < 992 && navHamburgerBtn.current.click();
                  }}
                >
                  User
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currentPageURL === "/site" ? "active fw-semibold" : ""
                  }`}
                  to="/site"
                  onClick={() => {
                    window.innerWidth < 992 && navHamburgerBtn.current.click();
                  }}
                >
                  Site
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currentPageURL === "/work_order" ? "active fw-semibold" : ""
                  }`}
                  to="/work_order"
                  onClick={() => {
                    window.innerWidth < 992 && navHamburgerBtn.current.click();
                  }}
                >
                  Work Order
                </Link>
              </li>

              {user_role && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      currentPageURL === "/roles" ? "active fw-semibold" : ""
                    }`}
                    to={`/roles`}
                  >
                    Roles
                  </Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav ms-auto">
              {!isSmallScreen && showSearchBox && (
                <li className="nav-item ">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control shadow-none"
                      aria-label="search"
                      aria-describedby="basic-addon2"
                      placeholder="Search here..."
                      onChange={handleChangeSearch}
                      onKeyDown={handleKeyDown}
                      value={search?.value}
                    />
                    <button
                      className="input-group-text btn btn-primary"
                      id="basic-addon2"
                      onClick={handleSearch}
                      style={{ cursor: "pointer" }}
                    >
                      <FaSearch />
                    </button>
                  </div>
                </li>
              )}
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currentPageURL === "/profile" ? "active fw-semibold" : ""
                  }`}
                  to="/profile"
                  onClick={() => {
                    window.innerWidth < 992 && navHamburgerBtn.current.click();
                  }}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item ">
                <button className=" btn btn-danger" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SuperAdminNavBar;
