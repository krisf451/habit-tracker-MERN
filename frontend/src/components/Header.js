import React from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const user = false;

  const handleLogout = () => {
    console.log("clicked logout");
  };
  return (
    <header className="flex justify-between items-center py-5 border-b mb-14">
      <div className="logo">
        <Link to="/">HabitTracker</Link>
      </div>
      <ul className="flex items-center justify-between">
        {user ? (
          <li className="ml-5">
            <button className="btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link
                to="/auth"
                className="flex items-center transition-colors ease-in-out duration-300 hover:text-gray-600"
              >
                <FaSignInAlt className="mr-2" /> Login/Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

// .header ul li a {
//   display: flex;
//   align-items: center;
//   transition: color 300ms linear;
// }

export default Header;
