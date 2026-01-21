import React, {useContext, useState} from 'react'
import { Context } from '../main';
import axios from "axios"
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
   const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://hospital-management-system-backend-1lms.onrender.com/api/v1/user/login", { email, password, confirmPassword, role: "Admin" },
        {
          withCredentials: true,
          headers: { "content-type": "application/json" }
        });

      if (res.data.success) {
        toast.success(res.data.message);
        setIsAuthenticated(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" />
  }
  return (
    <>
    <div className="container form-component ">
      <img src="/logo.png" alt="logo" className='logo' />
      <h1 className="form-title">WELCOME TO ZEECARE </h1>
      <p>Only Admins Are Allowed to Access These Resources </p>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default Login
