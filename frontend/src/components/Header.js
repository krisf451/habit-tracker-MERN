import React from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };
  return (
    <header className="flex justify-between items-center py-5 border-b mb-14">
      <div>
        <Link to="/">HabitTracker</Link>
      </div>
      <ul className="flex items-center justify-between">
        {user ? (
          <li className="ml-5">
            <button
              className="flex items-center justify-center"
              onClick={handleLogout}
              type="button"
            >
              <FaSignOutAlt className="mr-2" /> Logout
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
