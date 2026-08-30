import { Link } from "react-router-dom";
import AboutPageAnimation from "../../../../config/animation/AboutPageAnimation.jsx";
import { ArrowLeft, Flame, Construction } from "lucide-react";
import './VideoGame.css';
function VideoGame(){
    return (
        <div className = "videoGameContainer">
            <AboutPageAnimation delay = {0}>
                <Link to = ".." className = "comebackButton">
                    <ArrowLeft aria-hidden = "true" size = {18}/>
                    Click here to back
                </Link>
            </AboutPageAnimation>
            <AboutPageAnimation>
                <div className = "mostGame">
                    <h2 style = {{display: "flex", alignItems: "center", gap: "10px", fontSize: "180%", marginBottom : "20px"}}> 
                        <Flame style = {{color: "var(--primary)", width: "50px", height: "50px"}}/> 
                        Most played 
                    </h2>

                    <div className = "gameBar">
                        <span className = "gameIconTooltip" data-tooltip = "Minecraft" role = "img" aria-label = "Minecraft" tabIndex = "0">
                            <img src = "/icon/minecraft.png" className = "iconVideoGame" alt = "Minecraft"/>
                        </span>
                        <span className = "gameIconTooltip" data-tooltip = "Valorant" role = "img" aria-label = "Valorant" tabIndex = "0">
                            <img src = "/icon/valorant.png" className = "iconVideoGame" alt = "Valorant"/>
                        </span>
                        <span className = "gameIconTooltip" data-tooltip = "Mobile Legends: Bang Bang" role = "img" aria-label = "Mobile Legends: Bang Bang" tabIndex = "0">
                            <img src = "/icon/mlbb.png" className = "iconVideoGame" alt = "Mobile Legends: Bang Bang"/>
                        </span>
                    </div>
                </div>  

                <div className = "developmentNotice" role = "status">
                <Construction aria-hidden = "true" size = {42}/>
                <h1>Coming soon</h1>
                <p>This page is being developed.</p>
            </div>
            </AboutPageAnimation>
        </div>
    );
}

export default VideoGame;