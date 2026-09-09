import { Link } from "react-router-dom";
import { ArrowLeft, CodeXml, Construction } from "lucide-react";
function Programming(){
    return (
        <div className="hobbySubpage">
            <Link to = ".." className = "comebackButton">
                    <ArrowLeft aria-hidden = "true" size = {18}/>
                    Click here to back
                </Link>
            <header className="hobbySubpageHeader">
                <div className="hobbySubpageHeading">
                    <span className="hobbySubpageIcon"><CodeXml aria-hidden="true" /></span>
                    <div>
                        <p className="hobbySubpageKicker">Build, break, learn</p>
                        <h1 className="hobbySubpageTitle">Programming</h1>
                    </div>
                </div>
                <p className="hobbySubpageDescription">Turning ideas into useful things, one line at a time.</p>
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

export default Programming;