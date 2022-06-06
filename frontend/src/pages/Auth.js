import React, { useState, useEffect } from "react";
import { Loader } from "../components";
import { FaUser } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { asyncLogin, reset } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Auth = () => {
  const { isLoading, user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, password, confirmPassword } = formValues;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    console.log("firing");
    if (isSuccess || user) {
      navigate("/");
    }

    return () => dispatch(reset());
  }, [isSuccess, user, dispatch, navigate, isError, message]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        // dispatch(asyncLogin(formValues));
        if (password !== confirmPassword) toast.error("Passwords do not match");
        console.log("sign up stuff");
      } else {
        dispatch(asyncLogin(formValues));
      }
    } catch (e) {
      throw new Error(e, "something went wrong with auth");
    }
    clear();
  };

  const clear = () => {
    setFormValues({ name: "", email: "", password: "", confirmPassword: "" });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <section className="text-3xl font-semibold mb-12 px-5">
        <h1>
          <FaUser /> {isSignup ? "Register" : "Login"}
        </h1>
        <p className="text-gray-400">
          {isSignup ? "Create your acccount" : "Access your habits"}
        </p>
        <p
          className="text-sm cursor-pointer text-blue-600 mt-4"
          onClick={() => setIsSignup((prev) => !prev)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "New to habit tracker? Register"}
        </p>
      </section>
      <section className="w-full sm:w-96 mx-auto transition-all duration-200 ease-linear">
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div>
              <label className="custom-label">Name</label>
              <input
                type="text"
                className="custom-input"
                id="name"
                name="name"
                value={name}
                autoComplete="name"
                placeholder="Enter Your Name"
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <label className="custom-label">Email</label>
            <input
              type="email"
              className="custom-input"
              id="email"
              name="email"
              value={email}
              autoComplete="email"
              placeholder="Enter Your Email"
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <label className="custom-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="custom-input"
              id="password"
              name="password"
              value={password}
              autoComplete="current-password"
              placeholder="Enter Your Password"
              onChange={handleChange}
            />
            <div
              className="absolute right-5 top-10 cursor-pointer opacity-60"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <MdVisibilityOff size={25} />
              ) : (
                <MdVisibility size={25} />
              )}
            </div>
          </div>
          {isSignup && (
            <div>
              <label className="custom-label">Confirm Password</label>
              <input
                type="password"
                className="custom-input"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Repeat Your Password"
                onChange={handleChange}
              />
            </div>
          )}
          <button type="submit" className="custom-btn">
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default Auth;
