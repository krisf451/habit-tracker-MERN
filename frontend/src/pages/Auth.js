import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Auth = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const { name, email, password, confirmPassword } = formValues;

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

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
        <form>
          {isSignup && (
            <div>
              <label className="text-gray-700 text-sm font-bold mb-2 ml-1 block text-left">
                Name
              </label>
              <input
                type="text"
                className="h-12 shadow appearance-none border-[#e6e6e6] rounded w-full text-gray-700 mb-2 leading-tight focus:outline-none pl-2"
                id="name"
                name="name"
                value={name}
                placeholder="Enter Your Name"
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <label className="text-gray-700 text-sm font-bold mb-2 ml-1 block text-left">
              Email
            </label>
            <input
              type="email"
              className="h-12 shadow appearance-none border-[#e6e6e6] rounded w-full text-gray-700 mb-2 leading-tight focus:outline-none pl-2"
              id="email"
              name="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <label className="text-gray-700 text-sm font-bold mb-2 ml-1 block text-left">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="h-12 shadow appearance-none border-[#e6e6e6] rounded w-full text-gray-700 mb-2 leading-tight focus:outline-none pl-2"
              id="password"
              name="password"
              value={password}
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
              <label className="text-gray-700 text-sm font-bold mb-2 ml-1 block text-left">
                Confirm Password
              </label>
              <input
                type="password"
                className="h-12 shadow appearance-none border-[#e6e6e6] rounded w-full text-gray-700 mb-2 leading-tight focus:outline-none pl-2"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Repeat Your Password"
                onChange={handleChange}
              />
            </div>
          )}
        </form>
      </section>
    </>
  );
};

export default Auth;
