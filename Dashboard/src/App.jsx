/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react'
import { Context } from "./main"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import AddNewDoctor from "./components/AddNewDoctor"
import AddNewAdmin from "./components/AddNewAdmin"
import Doctor from "./components/Doctor"
import Messages from "./components/Messages"
import Sidebar from "./components/Sidebar"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setAdmin } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "https://hospital-management-system-backend-1lms.onrender.com/api/v1/user/admin/me",
          { withCredentials: true }
        );

        if (data.success) {
          setIsAuthenticated(true);
          setAdmin(data.user);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };

    fetchUser();
  }, []);

  return (
    <Router>
      {isAuthenticated && <Sidebar />}

      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/doctor/addnew' element={<AddNewDoctor />} />
        <Route path='/admin/addnew' element={<AddNewAdmin />} />
        <Route path='/doctors' element={<Doctor />} />
        <Route path='/messages' element={<Messages />} />
      </Routes>

      <ToastContainer position='top-center' autoClose={2000} />
    </Router>
  );
};
export default App
