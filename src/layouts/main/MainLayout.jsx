import Header from "../header/Header.jsx";
import Navbar from "../navbar/Navbar.jsx";
import Footer from "../footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import '../../styles/theme.css';
import './MainLayout.css';
import { useEffect } from "react";
function MainLayout()
{
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className = "layoutContainer">
            <Header> </Header>
            <Navbar theme = {theme} setTheme = {setTheme}> </Navbar>
            <Outlet> </Outlet>
            <Footer> </Footer>
        </div>
    );
}
export default MainLayout;