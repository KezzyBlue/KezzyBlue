import { useState, useEffect } from "react";
import axios from "axios";
function Education() {

    const [edu, setEdu] = useState("null");

    const fetchEdu = async () => {
        const response = await axios.get("./user/profile/Profile.json");
        setEdu(response.data);
    }

    useEffect(() =>{
        fetchEdu();
    }, [])

    if(edu == "null") return (<h1> Loading.... </h1>)

    function loadSchool(school, index)
    {
        <p key = {index}> {school.name} </p>
    }

    return (
        <>
            <h1> Education 🎓 </h1>
            <div className="hor-line"> </div>

            <div>
                {edu.education.map((school, index) => loadSchool(school, index))}
            </div>
        </>
    );
}
export default Education;