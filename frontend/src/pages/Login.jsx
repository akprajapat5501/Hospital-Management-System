import React, { useContext, useState } from 'react'
import { Context } from '../main.jsx';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { isAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const navigation = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/v1/user/login", { email, password, confirmPassword, role: "Patient" },
        {
          withCredentials: true,
          headers: { "Content-type": "application/json" }
        });

      // if (res.data.success) {
      //   toast.success(res.data.message);
      //   setIsAuthenticated(true);
      //   navigation("/");
      // }
      toast.success(res.data.message);
      window.location.href = "/";
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" />
  }
  return (
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>please Login To Continue</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, at?</p>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <div style={{ gap: "10", justifyContent: "flex-end", flexDirection: "row" }}>
          <p style={{ marginBottom: 0 }}>Not Registered</p>
          <Link to="/register" style={{ textDecoration: "none", alignItems: "center" }} >Registered Now</Link>
        </div>
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login