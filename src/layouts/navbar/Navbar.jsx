import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { routes } from '../../config/routes.jsx';
import '../../styles/theme.css';
import { useState } from 'react';
import MoonIcon from "/icon/moon.svg?react";
import SunIcon from "/icon/sun.svg?react";

function Navbar({ theme, setTheme }) {
    const toggleTheme = () => {
        setTheme(theme == "light" ? "dark" : "light");
    };
    return (
        <div className="navbarContainer">
            <div className="navbar">
                {routes
                    .filter(route => route.showInNavbar)
                    .map(route => (
                        <NavLink key={route.path} to={route.path} className={({ isActive }) => isActive ? "active" : "nonactive"}>
                            {route.title}
                        </NavLink>
                    ))}
            </div>
            <button className="themeToggle themeIcon" onClick={toggleTheme}>
                {theme === "light" ? "⏾" : "☀︎"}
            </button>
        </div>
    );
}
export default Navbar;