import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
const RegisterPage = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState(false);

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in!");
      setRedirect(true);
    } catch (e) {
      alert("Registration failed. Please try again!");
    }
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="font-extrabold text-3xl text-center mb-4 underline ">
          SignUp
        </h1>
        <form action="" className="max-w-md mx-auto " onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already had an account? {""}
            <Link to={"/login"} className="text-black underline font-bold">
              SignIn
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
