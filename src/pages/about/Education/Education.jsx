import { useState, useEffect } from "react";
import axios from "axios";
import AboutPageAnimation from '../../../config/animation/AboutPageAnimation.jsx';

function Education() {

    const [edu, setEdu] = useState("null");
    const [codeforces, setCodeforces] = useState("null");

    const fetchEdu = async () => {
        const response = await axios.get("/user/profile/Profile.json");
        setEdu(response.data.education);
    }

    const fetchCodeforces = async () => {
        const response = await axios.get("https://codeforces.com/api/user.info?handles=hieudttdvp");
        setCodeforces(response.data.result[0]);
    }

    useEffect(() => {
        fetchEdu();
        fetchCodeforces();
    }, [])

    if (edu == "null") return (<h1> Loading.... </h1>)

    function loadSchool(school, index) {
        const date_start = new Date(school.start).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        const date_end = new Date(school.end).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

        return (
            <div key={index}>
                <AboutPageAnimation delay={index * 0.15}>
                    <div className="about-school" style = {{marginTop: "20px"}}>
                        <a href={school.page} target="_blank" rel="noopener noreferrer">
                            <img src={school.image} alt={school.name} className="school-icon" />
                        </a>
                        <div>
                            <b> {school.name} </b>
                            <div className="school-info">

                                <p> Start: {date_start} </p>
                                <p> End: {date_end} </p>
                                <p> ---- </p>
                                <i> {school.info} </i>
                            </div>
                        </div>
                    </div>
                </AboutPageAnimation>

            </div>
        );
    }
    const getRatingColor = (rating) => {
        if (rating >= 3000) return "var(--rating-high)";
        if (rating >= 2600) return "var(--rating-high)";
        if (rating >= 2400) return "var(--rating-high)";
        if (rating >= 2300) return "var(--rating-orange)";
        if (rating >= 2100) return "var(--rating-orange)";
        if (rating >= 1900) return "var(--rating-purple)";
        if (rating >= 1600) return "var(--rating-blue)";
        if (rating >= 1400) return "var(--rating-teal)";
        if (rating >= 1200) return "var(--rating-green)";
        return "var(--rating-muted)";
    };
    const ratingColor = getRatingColor(codeforces.rating);
    const maxRatingColor = getRatingColor(codeforces.maxRating);
    return (
        <AboutPageAnimation delay={0.05}>
            <h1> School 🎓 </h1>
            <div className="hor-line"> </div>
            <div>
                {edu.map((school, index) => loadSchool(school, index))}
            </div>
            <h2> Achievements 🏆 </h2>
            <div className="hor-line"> </div>
            <div className="achievements" style = {{marginTop: "20px"}}>
                <div className="achieve-card">
                    <div className="card-header">
                        <h2>Codeforces</h2>
                    </div>

                    <div className="card-body">
                        <img src={codeforces.titlePhoto} alt="Codeforces" className="card-image"/>

                        <div className="stats">
                            <div className="stat">
                                <span className="label">Current Rating</span>
                                <span className="value" style={{ color: ratingColor }}> {codeforces.rating} </span>
                            </div>

                            <div className="stat">
                                <span className="label">Peak Rating</span>
                                <span className="value" style={{ color: maxRatingColor }}>
                                    {codeforces.maxRating}
                                </span>
                            </div>

                            <div className="stat">
                                <span className="label">Rank</span>
                                <span className="value" style={{ color: ratingColor }}> {codeforces.rank} </span>
                            </div>
                        </div>

                        <br/>

                        <a href="https://codeforces.com/profile/hieudttdvp" target="_blank" rel="noreferrer">
                            <b>Read more →</b>
                        </a>
                    </div>
                </div>
                <div className="achieve-card">
                    <div className="card-header">
                        <h2> VOI 2026 </h2>
                    </div>

                    <div className="card-body">
                        <img src="https://ik.imagekit.io/ofdnnpbgza/adu" alt="VOI 2026" className="card-image" />

                        <h3>🥉 Third Prize</h3>
                        <p style = {{color: "var(--rating-high)"}}>Vietnam Olympiad in Informatics</p>
                    </div>
                    <br />
                    <a href="https://www.facebook.com/reel/1500115811053541" target="_blank">
                        <b> Read more → </b>
                    </a>
                </div>
                <div className="achieve-card">
                    <div className="card-header">
                        <h2>HUST</h2>
                    </div>

                    <div className="card-body">
                        <img src="https://ik.imagekit.io/ofdnnpbgza/786561790_2818745598483648_1638549352490199460_n.jpg" alt="HUST" className="card-image" />
                        <h3>Computer Science</h3>
                    </div>
                    <br />

                </div>

            </div>
        </AboutPageAnimation>
    );
}
export default Education;