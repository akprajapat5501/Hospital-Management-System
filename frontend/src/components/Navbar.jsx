import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../main.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const navigation = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await axios.get("https://hospital-management-system-backend-1lms.onrender.com/api/v1/user/patient/logout", {
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                setIsAuthenticated(false);
            } else {
                toast.error("Failed to Logout");
            }
        } catch (error) {
            toast.error("Patient not authenticated", error);
        }

    }

    const gotoLogin = () => {
        navigation("/login");
    }
    return (
       <>
        <nav className="container">
            <div className="logo"><img src="./logo.png" alt="logo" className='logo-img' /></div>
            <div className={show ? "navLinks showmenu" : "navLinks"}>
                <div className="links">
                    <Link to="/" onClick={() => setShow(!show)}>Home</Link>
                    <Link to="/about" onClick={() => setShow(!show)}>About Us</Link>
                    <Link to="/appointment" onClick={() => setShow(!show)}>Appointment</Link>
                </div>
                {isAuthenticated ? (
                    <button className="logoutBtn btn" onClick={handleLogout} >LOGOUT</button>
                ) : (
                    <button className="logoutBtn btn" onClick={gotoLogin} >LOGIN</button>
                )}
            </div>
            <div className="hamburger"  style = {{cursor:"pointer"}} onClick={() => setShow(!show)}> <GiHamburgerMenu /> </div>
        </nav>
       </>
    )
}

export default Navbar

