import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">HabitTracker</Link>
      </div>
      <ul>
        <li className="transition-all duration-300 ease-linear">
          <Link to="/auth">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to="/auth">
            <FaUser /> Register
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
