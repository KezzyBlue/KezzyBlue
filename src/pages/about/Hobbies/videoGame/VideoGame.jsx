import { Link } from "react-router-dom";
import AboutPageAnimation from "../../../../config/animation/AboutPageAnimation.jsx";
import { ArrowLeft, Flame, Construction, Gamepad } from "lucide-react";
import './VideoGame.css';
import { useState, useRef, useEffect } from "react";
import Minecraft from "./minecraft/Minecraft.jsx";
import Valorant from "./valorant/Valorant.jsx";

function VideoGame() {
    const [select, setSelect] = useState("Minecraft");

    const gameBarRef = useRef(null);
    const gameRefs = {
        Minecraft: useRef(null),
        Valorant: useRef(null),
        MLBB: useRef(null),
    };

    const [indicatorStyle, setIndicatorStyle] = useState({});

    useEffect(() => {
        const bar = gameBarRef.current;
        const selectedGame = gameRefs[select]?.current;

        if (!bar || !selectedGame) return;

        const barRect = bar.getBoundingClientRect();
        const gameRect = selectedGame.getBoundingClientRect();

        setIndicatorStyle({
            width: gameRect.width,
            transform: `translateX(${gameRect.left - barRect.left}px)`,
        });
    }, [select]);

    

    function Render()
    {
        if(select == "Minecraft") return (<Minecraft/>);   
        if(select == "Valorant") return (<Valorant/>);
    }

    return (
        <div className="videoGameContainer">
            <AboutPageAnimation delay={0}>
                <Link to=".." className="comebackButton">
                    <ArrowLeft aria-hidden="true" size={18} />
                    Click here to back
                </Link>
            </AboutPageAnimation>
            <AboutPageAnimation>
                <div className="gameHeader">
                    <h1 className="gameTitle">
                        <Gamepad className="gameIcon" />
                        Video game
                    </h1>
                    <p> Anyway, I'm still a kid and I like playing video games </p>
                </div>

                <div className="hor-line"></div>

                <div className="mostGame">
                    <div className="gameBar" ref={gameBarRef}>

                        <div
                            className="gameIndicator"
                            style={indicatorStyle}
                        />

                        <span
                            ref={gameRefs.Minecraft}
                            className="gameIconTooltip"
                            data-tooltip="Minecraft"
                            role="img"
                            aria-label="Minecraft"
                            tabIndex="0"
                            onClick={() => setSelect("Minecraft")}
                        >
                            <img
                                src="/icon/minecraft.png"
                                className="iconVideoGame"
                                alt="Minecraft"
                            />
                        </span>

                        <span
                            ref={gameRefs.Valorant}
                            className="gameIconTooltip"
                            data-tooltip="Valorant"
                            role="img"
                            aria-label="Valorant"
                            tabIndex="0"
                            onClick={() => setSelect("Valorant")}
                        >
                            <img
                                src="/icon/valorant.png"
                                className="iconVideoGame"
                                alt="Valorant"
                            />
                        </span>

                        <span
                            ref={gameRefs.MLBB}
                            className="gameIconTooltip"
                            data-tooltip="Mobile Legends: Bang Bang"
                            role="img"
                            aria-label="Mobile Legends: Bang Bang"
                            tabIndex="0"
                            onClick={() => setSelect("MLBB")}
                        >
                            <img
                                src="/icon/mlbb.png"
                                className="iconVideoGame"
                                alt="Mobile Legends: Bang Bang"
                            />
                        </span>

                    </div>

                    <div className = "gameLine"> </div>

                    <div className = "gameInfo">
                        {
                            Render()
                        }
                    </div>


                </div>

                <div className="developmentNotice" role="status">
                    <Construction aria-hidden="true" size={42} />
                    <h1>Coming soon</h1>
                    <p>This page is being developed.</p>
                </div>
            </AboutPageAnimation>
        </div>
    );
}

export default VideoGame;