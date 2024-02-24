import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Task Manager</h1>
      <p>Manage your tasks efficiently and effortlessly.</p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary mx-2">
          Login
        </Link>
        <Link to="/signup" className="btn btn-secondary mx-2">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Home;
