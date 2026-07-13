import axios from "axios";
import { use, useDebugValue, useEffect, useState } from "react";
import './UserInfo.css';

function UserInfo() {
    const userId = "812486503572832327";

    const [userData, setUserData] = useState(null);
    const [avatarFrame, setAvatarFrame] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [introduce, setIntroduce] = useState("");

    const fetchIntroduce = async () =>
    {
        try{
            const response = await axios.get("user/introduce/introduce.json");
            setIntroduce(response.data.about);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.lanyard.rest/v1/users/${userId}`);
            setUserData(response.data.data);
            setAvatarFrame(`https://cdn.discordapp.com/avatar-decoration-presets/${response.data.data.discord_user.avatar_decoration_data.asset}`)
            setAvatar(`https://cdn.discordapp.com/avatars/${userId}/${response.data.data.discord_user.avatar}`);
        }
        catch (error) {
            console.log("error:", error);
        }
    }

    useEffect(() => {
        fetchData();
        fetchIntroduce();
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, []);


    const [hover, setHover] = useState(false);


    function convertToMinute(time)
    {
        let minute = Math.floor(time % 3600 / 60).toString().padStart(2, "0")
        let second = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minute} : ${second}`
    }
    function activitiesList(activity, index) {
        const playedTime = (new Date() - (activity.timestamps.start ? activity.timestamps.start : activity.timestamps)) / 1000;
        let hour = Math.floor(playedTime / 3600).toString().padStart(2, "0");
        let minute = Math.floor(playedTime % 3600 / 60).toString().padStart(2, "0");
        let second = Math.floor(playedTime % 60).toString().padStart(2, "0");
        if(activity.name == "Spotify")
        {
            const totalTime = (activity.timestamps.end - activity.timestamps.start) / 1000;
            const song = userData.spotify.song;
            const artist = userData.spotify.artist;
            const albumArt = userData.spotify.album_art_url;
            const progress = playedTime / totalTime * 100;
            return (
            <li key={index}>
                <span> Listening to Spotify</span>
                <div className = "activity">
                    <div className = "spotify">
                        <img src = {albumArt} className = "albumArt"/>
                        <div className = "infoSong">
                            <span className = "song"> {song} </span>
                            <span className = "artist"> {artist} </span>
                            <div className = "songTime">
                                <span> {convertToMinute(playedTime)} </span>
                                <span> {convertToMinute(totalTime)} </span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill"style={{ width: `${progress}%` }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
        }
        else
        return (
            <li key={index}>
                <span> {activity.name} </span>
                <div className = "activity">
                    <p> 🎮 {hour} : {minute} : {second} </p>
                </div>
            </li>
        );
    }


    return (
        <div className = "userInfoContainer">
            <div className="avatarContainer" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <img src={avatar} className="avatar" />
                <img src={avatarFrame} className="avatarFrame"/>
                <div className={`status ${userData?.discord_status}`}>
                    {userData?.discord_status === "online" && (<div className="pulse"></div>)}
                </div>
                {hover && userData?.activities?.length > 1 && (
                    <div className="activitiesContainer">
                        <b> May be online!! </b>
                        <ul>
                            {userData.activities.slice(1).map((activity, index) => activitiesList(activity, index))}
                        </ul>
                    </div>
                )}
            </div>
            <div className = "userInfo">
                <h1> Yup, {userData?.discord_user.display_name} here!! </h1>
                <div className = "line"> </div>
                <p className = "introduce">  {introduce} </p>
            </div>
        </div>
    );
}
export default UserInfo;