import React from "react";

export default function Menu({name, onClick, isActive}) {
    return (
        <div 
            className={`menu-category ${isActive ? 'active' : ''}`}
            onClick={onClick}
            >
            <div className="category-content">
                <h2 className="category-name">{name}</h2>
                <div className="category-hover-effect"></div>
            </div>
        </div>
    );
}
