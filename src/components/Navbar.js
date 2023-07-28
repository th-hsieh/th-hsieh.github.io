import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../components/shared/AuthContext.js";
import '../../src/App.css'

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const hasLoginToken = document.cookie.includes("loginToken");
  const [showOpinionsDropdown, setShowOpinionsDropdown] = useState(false);
  const [showCollaboratorsDropdown, setShowCollaboratorsDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleOpinionsDropdown = () => {
    setShowOpinionsDropdown(!showOpinionsDropdown);
  };

  const toggleCollaboratorsDropdown = () => {
    setShowCollaboratorsDropdown(!showCollaboratorsDropdown);
  };

  const linkStyle = {
    color: "rgb(88, 88, 88)",
    fontSize: windowWidth > 768 ? "18px" : "14px",
    textDecoration: "underline",
    marginBottom: "0em",
    padding: "5px",
    backgroundColor: "white",
  };

  const dropdownContentStyle = {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    backgroundColor: "#f9f9f9",
    minWidth: "160px",
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
    zIndex: "1",
    right: "0",
  };

  const closeDropdownWithDelay = () => {
    setTimeout(() => {
      setShowOpinionsDropdown(false);
      setShowCollaboratorsDropdown(false);
    }, 50); // 0.05 second delay
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <nav className="navbar" style={{ borderBottom: "none" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ color: "black", fontSize: windowWidth > 768 ? "5em" : "3em", fontWeight: "bold" }}>
          public+privacy
        </h2>

        <Link to={hasLoginToken || isAuthenticated ? "/collaborator/logout" : "/collaborator/login"} style={linkStyle}>
          {hasLoginToken || isAuthenticated ? "Logout" : "Login"}
        </Link>
      </div>

      <div>
        <div>
          <Link to="/about" style={linkStyle} onClick={closeDropdownWithDelay}>
            About
          </Link>
        </div>

        <div className="dropdown">
          <button className="dropbtn" onClick={toggleOpinionsDropdown} style={linkStyle}>
            Opinions
          </button>
          {showOpinionsDropdown && (
            <div className="dropdown-content" style={dropdownContentStyle} onClick={closeDropdownWithDelay}>
              <Link className="text-decoration-none" to="/forum/opinions">
                Opinion Board
              </Link>

              {isAuthenticated && (
                <Link className="text-decoration-none" to="/forum/opinions/add">
                  Share Your Opinion
                </Link>
              )}
            </div>
          )}
        </div>

        {isAuthenticated ? (
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleCollaboratorsDropdown} style={linkStyle}>
              Collaborator Dashboard
            </button>
            {showCollaboratorsDropdown && (
              <div className="dropdown-content" style={dropdownContentStyle} onClick={closeDropdownWithDelay}>
                <Link className="text-decoration-none" to="/collaborator">
                  To Collaborators
                </Link>

                <Link className="text-decoration-none" to="/collaborator/dashboard">
                  Collaborator Dashboard
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleCollaboratorsDropdown} style={linkStyle}>
              Collaborators
            </button>
            {showCollaboratorsDropdown && (
              <div className="dropdown-content" style={dropdownContentStyle} onClick={closeDropdownWithDelay}>
                <Link className="text-decoration-none" to="/collaborator">
                  To Collaborators
                </Link>

                <Link className="text-decoration-none" to="/collaborator/register">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}

        <Link to="/selected-references" style={linkStyle} onClick={closeDropdownWithDelay}>
          Selected References
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


