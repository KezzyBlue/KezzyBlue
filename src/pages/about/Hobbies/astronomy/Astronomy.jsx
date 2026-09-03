import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Telescope, NotebookPen, MoonStar, Lightbulb, Cloudy, Clock, Construction } from "lucide-react";
import './Astronomy.css';
import AboutPageAnimationn from '../../../../config/animation/AboutPageAnimation.jsx';
import TonightSky from "../../../../components/TonightSky";
import WeatherCard from "../../../../components/WeatherCard";
function Astronomy() {
    return (
        <div className="">
            <AboutPageAnimationn delay={0.01}>
                <Link to=".." className="comebackButton">
                    <ArrowLeft aria-hidden="true" size={18} />
                    Click here to back
                </Link>
            </AboutPageAnimationn>
            <AboutPageAnimationn delay={0.08}>
                <div className="astroHeader">
                    <h1 className="astroTitle">
                        <Telescope className="astroIcon" />
                        Astronomy
                    </h1>
                    <p>I just simply have an interest in the vast universe.</p>
                </div>
            </AboutPageAnimationn>
            <AboutPageAnimationn delay={0.15}>
                <div className="hor-line" style={{ margin: "30px 0px" }} />
                <div className="skyInfo">
                    <WeatherCard />
                    <TonightSky />
                </div>
            </AboutPageAnimationn>

            <AboutPageAnimationn delay={0.25}>
                <div className="astroNote">
                    <h2 className = "tipTrickHeader">
                        <NotebookPen className = "tipTrickIcon"/> Some tips and tricks you should know:
                    </h2>
                    <span> <MoonStar className="astroIconBlue" /> Choose a night with little moon — Prefer nights close to the New Moon to shoot the Milky Way and deep-sky. </span>
                    <span> <Lightbulb className="astroIconBlue" /> Avoid light pollution — Go away from the city, prioritize places with Bortle 1–4.</span>
                    <span> <Cloudy className="astroIconBlue" /> Check clouds before going — Low clouds, humidity, and visibility are just as important as the weather forecast.</span>
                    <span> <Clock className="astroIconBlue" /> Determine direction and timing — Use Stellarium/Sky Map to know where and when celestial objects appear.</span>
                </div>
            </AboutPageAnimationn>

            <AboutPageAnimationn delay={0.35}>
                <div className="astroRecordContainer">
                    <p className="astroLabel"> <Camera /> how I enjoy my hobbies in a frugal way </p>
                    <div className="astroMd"> warning: terrible resolution </div>
                    <div className="astroGallery">
                        <img src="\image\page\about\hobbies\astronomy\my-first-milkyway.jpg" className="astroRecord" />
                        <iframe
                            className="astroRecord"
                            src="https://www.youtube.com/embed/FUlkWqZfiFA"
                            title="Milky Way timelapse"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>
            </AboutPageAnimationn>

            <div className="developmentNotice" role="status">
                <Construction aria-hidden="true" size={42} />
                <h1>Coming soon</h1>
                <p>This page is still being developed.</p>
            </div>

        </div>
    );
}

export default Astronomy;