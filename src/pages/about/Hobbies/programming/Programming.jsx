import { Link } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";
function Programming(){
    return (
        <div className = "">
            <Link to = ".." className = "comebackButton">
                    <ArrowLeft aria-hidden = "true" size = {18}/>
                    Click here to back
                </Link>
            <div className = "developmentNotice" role = "status">
                <Construction aria-hidden = "true" size = {42}/>
                <h1>Coming soon</h1>
                <p>This page is being developed.</p>
            </div>
        </div>
    );
}

export default Programming;