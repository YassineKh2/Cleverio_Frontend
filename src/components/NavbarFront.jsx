import React from "react";
import { Link } from "react-router-dom";
import "./NavbarFront.css"; // Import the CSS file for styling
import ProfileFront from "../components/partials/header/Tools/ProfileFront.jsx"

function NavbarFront() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/front" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/front/events" className="navbar-link">
            Events
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/front/courses" className="navbar-link">
            Courses
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/front/shop" className="navbar-link">
            Shop
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/front/displayrooms" className="navbar-link">Rooms</Link>
        </li>
      </ul>
      <div className="profile-container">
                <ProfileFront />
            </div>
    </nav>
  );
}

export default NavbarFront;
