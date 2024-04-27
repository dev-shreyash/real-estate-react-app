import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";



function Register() {
  const [error, setError] = useState("");
  const navigate =useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post('/auth/register', {
        username,
        email,
        password
      });
      
      // Optionally, redirect to another page after successful registration
      console.log("Registration successfull:", res.data);
      // Redirect logic here
      navigate("/login")

    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message);
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Already have an account? Login</Link>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
