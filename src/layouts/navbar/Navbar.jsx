import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { routes } from '../../config/routes.jsx';
import '../../styles/theme.css';
import { useState } from 'react';
function Navbar({theme, setTheme})
{
    const [statusTheme, setStatusTheme] = useState("./icon/moon.svg")
    const toggleTheme = () => 
    {
        setTheme(theme == "light" ? "dark" : "light");
        setStatusTheme(statusTheme == "./icon/moon.svg" ? "./icon/sun.svg" : "./icon/moon.svg");
    };
    return (
        <div className = "navbarContainer">
            <div className = "navbar">
                {routes
                    .filter(route => route.showInNavbar)
                    .map(route => (
                        <NavLink key={route.path} to={route.path} className={({ isActive }) => isActive ? "active" : "nonactive"}>
                            {route.title}
                        </NavLink>
                    ))}
            </div>wd
            <button className = "themeToggle" onClick = {() => toggleTheme()}> <img src = {statusTheme} className = "themeIcon"/> </button>
        </div>
    );
}
export default Navbar;