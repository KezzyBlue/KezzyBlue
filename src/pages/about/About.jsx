import { useEffect, useState } from 'react';
import '../../styles/theme.css';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import AboutPageAnimation from '../../config/animation/AboutPageAnimation.jsx';
import './About.css';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 30,
        scale: 0.98,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -25,
        scale: 0.98,
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 1, 1],
        },
    },
};

function About() {
    const [verNav, setVerNav] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchVerNav = async () => {
            try {
                const response = await axios.get(
                    '/pages/About-VerticalNavigation.json'
                );

                setVerNav(response.data);
            } catch (error) {
                console.error("Cannot load navigation:", error);
            }
        };

        fetchVerNav();
    }, []);

    if (!verNav) {
        return (
            <div className="loading">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="aboutContainer">

            <div className="vernav">
                {verNav.map((x, index) => (
                    <AboutPageAnimation delay={(index + 1) * 0.08} key = {index}>
                    <NavLink
                        to={`/about/${x.id}`}
                        className={({ isActive }) =>
                            `buttonn ${isActive ? "active" : ""}`
                        }
                    >
                        {x.name}
                    </NavLink>
                    </AboutPageAnimation>
                ))}
            </div>

            <div className="info">
                <AnimatePresence mode="wait" initial={true}>
                    
                        <Outlet />
                </AnimatePresence>
            </div>

        </div>
    );
}

export default About;