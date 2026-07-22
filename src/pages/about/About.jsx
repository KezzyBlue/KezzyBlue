import { useEffect, useState } from 'react';
import '../../styles/theme.css';
import axios from 'axios';
import PageTransition from '../../config/animation/PageTransition.jsx';
import './About.css';
import Intro from './Intro.jsx';
import Education from './Education.jsx';
import Hobbies from './Hobbies.jsx';
import Interest from './Interest.jsx';
function About()
{
    const [verNav, setVerNav] = useState(null);
    const [active, setActive] = useState("intro");
    const [info, setInfo] = useState(null);

    const fetchVerNav = async () => {
        const response = await axios.get('./pages/About-VerticalNavigation.json');
        setVerNav(response.data);
    }


    useEffect(() => {
        fetchVerNav();
    }, [])
    if(!verNav){
        return (<h1> Loading </h1>);
    }

    function Render()
    {
        if(active == "intro")
            return (<Intro> </Intro>);
        if(active == "education")
            return (<Education/>);
        if(active == "hobbies")
            return (<Hobbies/>);
        if(active == "interest")
            return (<Interest/>);
    }
    function update(x)
    {
        setActive(x.id);
    }

    return(
            <div className = "aboutContainer">
                <div className = "vernav">
                    {
                        verNav.map((x, index) => (<button className = {active == x.id ? "active" : ""} key = {index} onClick = {() => update(x)}> {x.name} </button>))
                    }
                </div>  
                <div className = "info"> {Render()} </div>
            </div>
    );
}
export default About;