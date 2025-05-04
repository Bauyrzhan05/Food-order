import React from "react";
import './App2.css';
import Navbar2 from "../../Foods/nav/navbar2";
import Sidebar from "../../Foods/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';


export default function App2() {
    
    return (
        <div>
            <ToastContainer/>
            <Navbar2/>
            <hr/>
            <div className="app2-content">
                <Sidebar/>
                <div className="app2-content-right">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}