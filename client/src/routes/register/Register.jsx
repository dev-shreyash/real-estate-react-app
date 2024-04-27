import "./register.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Register() {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      });
      
      // Optionally, redirect to another page after successful registration
      console.log("Registration successful:", res.data);
      // Redirect logic here

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
