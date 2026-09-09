import { Link } from "react-router-dom";
import { ArrowLeft, Construction, Film } from "lucide-react";
function Movie(){
    return (
        <div className="hobbySubpage">
            <Link to = ".." className = "comebackButton">
                    <ArrowLeft aria-hidden = "true" size = {18}/>
                    Click here to back
                </Link>
            <header className="hobbySubpageHeader">
                <div className="hobbySubpageHeading">
                    <span className="hobbySubpageIcon"><Film aria-hidden="true" /></span>
                    <div>
                        <p className="hobbySubpageKicker">Stories on screen</p>
                        <h1 className="hobbySubpageTitle">Movie</h1>
                    </div>
                </div>
                <p className="hobbySubpageDescription">A good story can stay with you long after the credits.</p>
            </header>
            <div className="hobbySubpageRule" />
            <div className = "developmentNotice" role = "status">
                <Construction aria-hidden = "true" size = {42}/>
                <h1>Coming soon</h1>
                <p>This page is being developed.</p>
            </div>
        </div>
    );
}

export default Movie;