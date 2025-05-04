import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../../assets/frontend_assets/assets";
import './nav.css'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/export"
import {login} from "../redux/export"
import bcrypt from "bcryptjs";


export default function Navbar(){

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [showLogin, setShowLogin] = useState(false);
    const [currState, setCurrState] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");


    const onLogin = async (e) => {
        e.preventDefault();
    

        if (currState === "Sign up") {

            const hashedPassword = bcrypt.hashSync(password, 12);
            try {
                const checkRes = await fetch(`http://localhost:8080/users?email=${email}`);
                const checkData = await checkRes.json();

                if (checkData.length > 0) {
                    toast.error("This email already exists");
                    return;  
                }

                const response = await fetch("http://localhost:8080/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password: hashedPassword, role }),
                });
    
                if (response.ok ) {
                    setCurrState("Login")
                    toast.success(`Registration successful ${name}!`);
                }else {
                    toast.error("Registration failed");
                }
            } catch (error) {
                console.log(error);
                toast.error("Server error");
            }
        } else {
            // Login
            try {
                const res = await fetch(`http://localhost:8080/users?email=${email}`);
                const data = await res.json();
    
                if (data.length > 0) {
                    const user = data[0];
                
                    // Check password
                    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
                
                    if (isPasswordCorrect) {
                        setShowLogin(false);
                        dispatch(login(user));
                    } else {
                        toast.error("Wrong password");
                    }
                } else {
                    toast.error("Email not found");
                }
            } catch (error) {
                console.log(error);
             toast.error("Login failed");
            }
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }
    

    return (
        <>
        <div className='navbar'>
            <Link to={"/"}><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className='navbar-menu'>
                <Link to={"/"} >Home</Link>
                <a href="#explore-menu" >menu</a>
                <a href="#footer" >contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt=""/>
                <div className="navbar-seacrh-icon">
                    <Link to="/cart"><img src={assets.basket_icon} alt=""/></Link>
                    <div></div>
                </div>
                
                {!user ? 
                <button onClick={() => setShowLogin(true)}>sign in</button>
                :<div className='navbar-profile'>
                    <img src={assets.profile_icon} />
                    <p>{user.name}</p>
                    <ul className="nav-profile-dropdown">
                        <li onClick={handleLogout} ><img src={assets.logout_icon}/><a href="">Logout</a></li>
                    </ul>
                </div>
                }
            </div>
        </div>
        
        {showLogin && (
                <div className="login-popup">
                    <form className="login-popup-container" onSubmit={onLogin}>
                        <div className="login-popup-title">
                            <h2>{currState}</h2>
                            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
                        </div>
                        <div className="login-popup-inputs">
                            {currState === "Login" ? null : (
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            )}
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {
                                currState === "Login" ? null 
                                :<div className="role-select-container">
                                    <h4>Choose a role:</h4>
                                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="user">User</option>
                                        <option value="manager">Manager</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            }
                        </div>
                        <button type="submit">
                            {currState === "Sign up" ? "Create Account" : "Login"}
                        </button>
                        <div className="login-popup-condition">
                            <p>By continuing, I agree to the terms of use & privacy policy</p>
                        </div>
                        {currState === "Login" ? (
                            <p>Create a new account? <span onClick={() => setCurrState("Sign up")}>Click here</span></p>
                        ) : (
                            <p>Already have an account? <span onClick={() => setCurrState("Login")}>Click here</span></p>
                        )}
                    </form>
                </div>
            )}
        </>
        
    )
}