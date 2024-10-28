import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarFront.css"; // Import the CSS file for styling
import { logoutUser } from "../Services/authService";

function NavbarFront() {
    const navigate = useNavigate();
    const handleLogOut = () => {
        logoutUser();
        navigate("/")

    }
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/front" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/front/events" className="navbar-link">Events</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/front/courses" className="navbar-link">Courses</Link>
                </li>
            </ul>
            <button onClick={handleLogOut} className="logout-button">Logout</button>
        </nav>
    );
}

export default NavbarFront;
