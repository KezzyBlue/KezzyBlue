import Header from "../header/Header.jsx";
import Navbar from "../navbar/Navbar.jsx";
import Footer from "../footer/Footer.jsx";
import Music from "../music/Music.jsx";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from 'lucide-react'
import "../../styles/theme.css";
import "./MainLayout.css";

import AnimatedOutlet from "./AnimatedOutlet.jsx";

function MainLayout() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );
    const [showUi, setShowUi] = useState(true);
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (

        <>
            <div className="uiToggle" onClick={() => setShowUi(prev => !prev)}>
                {
                    showUi ? (<Eye> </Eye>) : (<EyeOff></EyeOff>)
                }
            </div>
            <video
                className="backgroundVideo"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/video/background2.mp4" type="video/mp4" />
            </video>
            <Music />
            <div className="backgroundOverlay" />
            {
                showUi && (
                    <div className="layoutContainer">



                        <Header />

                        <Navbar theme={theme} setTheme={setTheme} />

                        <AnimatedOutlet />

                        

                        <Footer />
                    </div>
                )
            }

        </>
    );
}

export default MainLayout;