import { useEffect, useState } from 'react';
import axios from 'axios';
import AboutPageAnimation from '../../../config/animation/AboutPageAnimation.jsx';
import './Goals.css';


function Goals() {
    const [goals, setGoals] = useState();
    const fetchGoals = async () => {
        const response = await axios.get("/pages/Goals.json");
        setGoals(response.data);
    }
    
    useEffect(() => {
        fetchGoals();
    }, []);

    if(!goals)
    {
        return (<> Loading... </>)
    }

    return (
        <AboutPageAnimation delay={0.05}>
            <div className = "goalsHeader">
                <span className="goalsEyebrow">A direction worth taking</span>
                <span className="goalsTitle">The next <em>milestones</em></span>
            </div>
            <div className="hor-line" style = {{marginBottom: "20px"}}> </div>
            {
                goals.map((goal, index) => 
                    <AboutPageAnimation delay={(index + 1) * 0.08}> 
                    <div className = "goal" key={goal.goal}>
                        <span className = "goalIndex"> 
                            {
                                String(index + 1).padStart(2, "0")
                            } 
                        </span>
                        <div className = "goalInfo">
                            <span className = "goalName"> {goal.goal} </span>
                            <span className = "goalDescribe"> {goal.describe} </span>
                        </div>
                        <span className="goalArrow" aria-hidden="true">↗</span>
                    </div>
                    </AboutPageAnimation>
                )
            }
        </AboutPageAnimation>
    );
}

export default Goals;