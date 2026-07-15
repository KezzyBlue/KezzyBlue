import './Navbar.css';
import { NavLink, useLocation } from 'react-router-dom';
import { routes } from '../../config/routes.jsx';
import '../../styles/theme.css';
import { useState, useEffect } from 'react';
import MoonIcon from "/icon/moon.svg?react";
import SunIcon from "/icon/sun.svg?react";

function Navbar({ theme, setTheme }) {
    const toggleTheme = () => {
        setTheme(theme == "light" ? "dark" : "light");
    };
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);

    }

    const location = useLocation();

    const currentRoute = routes.find(
        route => route.path === location.pathname
    );

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>

            <div className={`navbarContainer ${open ? "open" : ""}`}>
                <button className="humburger" onClick={() => toggle()}> {open ? "✕" : "☰"} </button>
                
                <h2 className="currentPage">
                    {window.innerWidth < 768 ? currentRoute?.title : ""}
                </h2>
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

            <div className={`navbarMobile ${open ? "open" : ""}`}>
                {routes
                    .filter(route => route.showInNavbar)
                    .map(route => (
                        <NavLink key={route.path} to={route.path} className={({ isActive }) => isActive ? "active" : "nonactive"}>
                            {route.title}
                        </NavLink>
                    ))}
            </div>
        </>
    );
}
export default Navbar;