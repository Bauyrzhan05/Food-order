import React from "react";
import { asset } from "../../../assets/admin_assets/assets";
import { Link } from "react-router-dom";
import './sidebar.css'

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <Link to="/admin-panel/add-food" className="sidebar-option">
                    <img src={asset.add_icon}/>
                    <p>Add food</p>
                </Link>
                <Link to="/admin-panel/food-list" className="sidebar-option">
                    <img src={asset.order_icon}/>
                    <p>Food list</p>
                </Link>
                <Link to="/admin-panel/add-menu" className="sidebar-option">
                    <img src={asset.add_icon}/>
                    <p>Add menu</p>
                </Link>
                <Link to="/admin-panel/menu-list" className="sidebar-option">
                    <img src={asset.order_icon}/>
                    <p>Menu item</p>
                </Link>
            </div>
        </div>
    );
}