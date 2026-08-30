import AboutPageAnimation from '../../../../config/animation/AboutPageAnimation.jsx';
import { Gamepad, Telescope, SportShoe, Music, CodeXml, Film } from 'lucide-react';
import './HobbiesMain.css';
import { NavLink } from 'react-router-dom';

const hobbies = [
    { to: 'video-game', label: 'Video game', icon: Gamepad, accent: 'game' },
    { to: 'astronomy', label: 'Astronomy', icon: Telescope, accent: 'space' },
    { to: 'sport', label: 'Sport', icon: SportShoe, accent: 'sport' },
    { to: 'music', label: 'Music', icon: Music, accent: 'music' },
    { to: 'programming', label: 'Programming', icon: CodeXml, accent: 'code' },
    { to: 'movie', label: 'Movie', icon: Film, accent: 'movie' },
];

function HobbiesMain() {
    return (
        <AboutPageAnimation delay={0.05}>
            <div className="hobbiesPage">
                <header className="hobbiesHeader">
                    <div className="hobbiesTitleWrap">
                        <span className="hobbiesBadge">✨ My lifestyle</span>
                        <h1 className="hobbiesTitle">Hobbies</h1>
                    </div>
                    <p className="hobbiesIntro">
                        The things I love, passionate about, and spend time exploring every day.
                    </p>
                </header>

                <div className="hor-line" />

                <div className="hobbiesContainer">
                    {hobbies.map(({ to, label, icon: Icon, accent }, index) => (
                        <AboutPageAnimation key={label} delay={0.1 + index * 0.05}>
                            <NavLink to={to} className="hobbyLink">
                                <div className={`hobbyCard ${accent}`}>
                                    <div className="hobbyTop">
                                        <span className="hobbyIndex">0{index + 1}</span>
                                        <div className="hobbyIconWrap">
                                            <Icon className="hobbyIcon" />
                                        </div>
                                    </div>

                                    <div className="hobbyBody">
                                        <h2>{label}</h2>
                                        <span className="hobbyTag">Explore</span>
                                    </div>
                                </div>
                            </NavLink>
                        </AboutPageAnimation>
                    ))}
                </div>
            </div>
        </AboutPageAnimation>
    );
}

export default HobbiesMain;