import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Auth = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignup, setIsSignup] = useState(false);
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
      <section className="form">
        <form>
          {isSignup && (
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="John Doe"
                onChange={handleChange}
              />
            </div>
          )}
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="johndoe@test.com"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="abc123"
              onChange={handleChange}
            />
          </div>
          {isSignup && (
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="abc123"
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
