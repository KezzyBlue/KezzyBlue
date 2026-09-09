import { Link } from "react-router-dom";
import { ArrowLeft, Construction, Trophy } from "lucide-react";
function Sport() {
    return (
        <div className="hobbySubpage">
            <Link to=".." className="comebackButton">
                <ArrowLeft aria-hidden="true" size={18} />
                Click here to back
            </Link>
            <header className="hobbySubpageHeader">
                <div className="hobbySubpageHeading">
                    <span className="hobbySubpageIcon"><Trophy aria-hidden="true" /></span>
                    <div>
                        <p className="hobbySubpageKicker">Move with purpose</p>
                        <h1 className="hobbySubpageTitle">Sport</h1>
                    </div>
                </div>
                <p className="hobbySubpageDescription">A little movement makes the rest of the day feel lighter.</p>
            </header>
            <div className="hobbySubpageRule" />
            <div className="developmentNotice" role="status">
                <Construction aria-hidden="true" size={42} />
                <h1>Coming soon</h1>
                <p>This page is being developed.</p>
            </div>
        </div>
    );
}

export default Sport;