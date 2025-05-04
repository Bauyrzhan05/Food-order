import React from "react";
import "./navbar2.css";
import { asset } from "../../../assets/admin_assets/assets";
import { Link } from "react-router-dom";
import bauka from './bauyrzhan.jpg';


export default function Navbar2() {
    return(
        <div className="navbar2">
            <Link to={"/"}><img src={asset.logo} alt="" className="logo" /></Link>
            <img className="profile2" src={bauka}/>
        </div>
    );
}