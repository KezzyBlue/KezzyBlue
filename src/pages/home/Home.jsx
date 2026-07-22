import './Home.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import '../../styles/theme.css';
import PageTransition from '../../config/animation/PageTransition.jsx';
function Home() {
    const [profile, setProfile] = useState(null);
    const [timeLived, setTimeLived] = useState(null);
    const fetchPersonalInformation = async () => {
        const response = await axios.get("./user/profile/Profile.json");
        setProfile(response.data);
    }

    useEffect(() => {
        fetchPersonalInformation();
    }, []);

    useEffect(() => {
        if (!profile) return;

        const birthday = new Date(profile.birthday);

        const update = () => {
            setTimeLived(Math.floor((Date.now() - birthday.getTime()) / 1000));
        };

        update();

        const interval = setInterval(update, 1000);

        return () => clearInterval(interval);
    }, [profile]);

    if (!profile) return (<h1> Loading...</h1>);

    return (
        <>
            <div className="homeContainer">
                <div className="box personalDetails transition">
                    <h1> ✏️ Personal details </h1>
                    <div className="details">
                        <p> ⏰ Bro has lived: {timeLived?.toLocaleString()} second </p>
                        <p> 💪 Gender: {profile.gender} </p>
                        <p> 🚩 Country: {profile.country} </p>
                        <p> 💕 Relationship status: {profile.relationshipStatus} </p>
                    </div>
                </div>
                <div className="box work transition">
                    <h1> 💼 Work </h1>
                    <div className="details">
                        {profile.jobs.map((job, index) => (
                            <p key={index}> {job.title} </p>
                        ))}
                    </div>
                </div>
                <div className="box education transition">
                    <h1> Education </h1>
                    {
                        profile.education.filter((school) => school.home === "show").map((school, index) => (
                                <div key={index} className="school">
                                    <a href={school.page} target="_blank"> <img src={school.image} className="logo" /> </a>
                                    <div className="schoolDetails">
                                        <h3> {school.name}</h3>
                                        <p> {school.note} </p>
                                    </div>
                                </div>
                            ))
                    }
                </div>

                <div className="box main">

                    <div>
                        <h1> Hey! Welcome to my website. 👋 </h1>
                        <p> I'm really glad you're here! </p>
                        <p> Hope you enjoy my official website 💝 </p>
                        <p> Have a great day, lil' friend 🍀</p>
                    </div>
                    <div>
                        <h1> Why does this website exist? 🤔 </h1>
                        <h3> It started with curiosity. </h3>
                        <p> After watching The Social Network, I realized that great software often begins with a simple idea and a willingness to build. </p>
                        <p> This website is my own place to experiment, learn, and share the things I'm passionate about. </p>
                        <p> It's constantly evolving—just like I am. </p>
                        <h3> Style of this website </h3>
                        <p> As I said, there was something that stayed with me after watching The Social Network and it encourage me to build this website. So you can get a sense of the Facebook website layout style on my website. </p>
                        <p> Additionally, my website is also based on some the idea of <a href="https://puppyz4nx.is-a.dev/" target="_blank"> Puppy-Z4nx </a>'s personal website.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;