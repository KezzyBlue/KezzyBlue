import Header from "../header/Header.jsx";
import Navbar from "../navbar/Navbar.jsx";
import Footer from "../footer/Footer.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import '../../styles/theme.css';
import './MainLayout.css';
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import PageTransition from "../../config/animation/PageTransition.jsx";
function MainLayout() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const location = useLocation();
    
    return (
        <div className="layoutContainer">
            <Header> </Header>
            <Navbar theme={theme} setTheme={setTheme}> </Navbar>
            <AnimatePresence mode="wait">
                <PageTransition key={location.pathname}>
                    <Outlet> </Outlet>
                </PageTransition>
            </AnimatePresence>
            <Footer> </Footer>
        </div>
    );
}
export default MainLayout;