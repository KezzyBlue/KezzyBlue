import axios from "axios";
import { use, useEffect, useState } from "react";
import './profile.css'
import '../../../styles/theme.css'
import { Gamepad2, CircleX } from "lucide-react";

function Profile() {
    const [status, setStatus] = useState("online");
    const [ui, setUi] = useState(null);
    const [avatarFrame, setAvatarFrame] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [effectIndex, setEffectIndex] = useState(0);
    const [userData, setUserData] = useState(null);
    const userId = "812486503572832327";
    const fetchProfile = async () => {
        const response = await axios.get("/user/extend/extend.json");
        setUi(response.data);
    }

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`https://api.lanyard.rest/v1/users/${userId}`);
            const profileData = response.data.data;
            const discordUser = profileData.discord_user;
            setUserData(profileData);
            setAvatarFrame(
                discordUser.avatar_decoration_data?.asset
                    ? `https://cdn.discordapp.com/avatar-decoration-presets/${discordUser.avatar_decoration_data.asset}`
                    : null
            );
            setAvatar(
                discordUser.avatar
                    ? `https://cdn.discordapp.com/avatars/${userId}/${discordUser.avatar}`
                    : null
            );
            setStatus(profileData.discord_status);
        }
        catch (error) {
            console.error("Cannot load Discord profile:", error);
        }
    }

    useEffect(() => {
        fetchUserData();
        fetchProfile();
        const interval = setInterval(fetchUserData, 1000);

        return () => clearInterval(interval);
    }, []);

    const effectDuration = [6000, 5000, 5000];

    useEffect(() => {
        if (!ui?.animation?.length) return;

        const timer = setTimeout(() => {
            if (effectIndex === 0) {
                setEffectIndex(1);
            } else if (effectIndex === 1) {
                setEffectIndex(2);
            } else {
                setEffectIndex(1);
            }
        }, effectDuration[effectIndex]);

        return () => clearTimeout(timer);
    }, [ui, effectIndex]);

    function convertToMinute(time) {
        let minute = Math.floor(time % 3600 / 60).toString().padStart(2, "0")
        let second = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minute} : ${second}`
    }

    function activitiesList(activity, index) {

        function activityIcon(x)
        {
            if(x == "Minecraft")
                return (<img src = "/icon/minecraft.png" className = "activityIcon"/>);
            if(x == "Valorant")
                return (<img src = "/icon/valorant.png" className = "activityIcon"/>);
            return (<Gamepad2 className="activityIcon"/>);
        }

        const playedTime = (new Date() - (activity.timestamps.start ? activity.timestamps.start : activity.timestamps)) / 1000;
        let hour = Math.floor(playedTime / 3600).toString().padStart(2, "0");
        let minute = Math.floor(playedTime % 3600 / 60).toString().padStart(2, "0");
        let second = Math.floor(playedTime % 60).toString().padStart(2, "0");
        if (activity.name == "Spotify") {
            const totalTime = (activity.timestamps.end - activity.timestamps.start) / 1000;
            const song = userData.spotify.song;
            const artist = userData.spotify.artist;
            const albumArt = userData.spotify.album_art_url;
            const progress = playedTime / totalTime * 100;
            return (

                <div className="activity" key={index}>
                    <span style={{ fontSize: "90%", color: "rgb(74, 73, 73)", marginLeft: "10px" }}> Listening to Spotify</span>
                    <div className="spotify">
                        <img src={albumArt} className="albumArt" />
                        <div className="infoSong">
                            <span className="song"> {song} </span>
                            <span className="artist"> {artist} </span>
                            <div className="songTime">
                                <span> {convertToMinute(playedTime)} </span>
                                <span> {convertToMinute(totalTime)} </span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
        else
            return (
                <div className="activity" key={index}>
                    <p style={{ fontSize: "90%", color: "rgb(74, 73, 73)" }}> Playing </p>
                    <div className="activityInfo">
                        {
                            activityIcon(activity.name)
                        }
                        
                        <div>
                            <p style={{ fontWeight: "bold", marginLeft: "0", color: "black" }}> {activity.name} </p>
                            <p style={{ fontSize: "90%", color: "#009936", marginTop: "5px", marginLeft: "0" }}> {hour} : {minute} : {second} </p>
                        </div>

                    </div>
                </div>

            );
    }

    function getStatus(status) {
        switch (status) {
            case "online":
                return "Let's see what he's doing....";

            case "idle":
                return "He's probably away....";

            case "dnd":
                return "Shh... don't disturb him.";

            case "offline":
                return "He's gone offline.";

            default:
                return "Status unknown.";
        }
    }

    return (
        <div className="profileExtend">

            {
                !(ui && userData) ? (<h1> Loading... </h1>) : (
                    <div className="profileContainer">
                        <div className="profileHeader">
                            <img src={ui.banner} className="profileBanner" />
                            <div className="avatarProfileContainer">
                                <img src={avatar} className="avatarProfile" />
                                <img src={avatarFrame} className="avatarFrameProfile" />
                                <div className="thinkingBubble">
                                    {
                                        userData.activities[0]? userData.activities[0].state : "I'm sleeping 💤💤💤💤💤💤"
                                    }
                                </div>
                                <div className={`status ${userData?.discord_status}`} style={{ zIndex: "2", bottom: "6px", right: "0px" }}>
                                    {userData?.discord_status === "online" && (<div className="pulse"></div>)}
                                </div>
                            </div>

                        </div>

                        <img src={ui.animation[effectIndex]} className="profileEffect" />
                        <div className="profileContent">
                            <div style = {{margin: "0 10px"}}>

                                <div className="profileUser">
                                    <h1 className="profileUserName toon animated" data-username="KezzyBlue_VN">
                                        KezzyBlue_VN
                                    </h1>
                                    <div className="pronouns">
                                        <div className="profileInfo"> {userData.discord_user.username} </div>
                                        •
                                        <div className="profileInfo"> Chè không nịch </div>
                                        •
                                        <div className="tag">
                                            <img src={`https://cdn.discordapp.com/clan-badges/${userData.discord_user.primary_guild.identity_guild_id}/${userData.discord_user.primary_guild.badge}.png?size=16`} />
                                            <span>    {userData.discord_user.primary_guild.tag} </span>
                                        </div>
                                    </div>
                                </div>
                                <p style={{ color: "black", marginTop : "20px" }}> {getStatus(status)} </p>
                                {
                                    userData.activities.length > 1 ?
                                        (userData.activities.slice(1).map((activity, index) => activitiesList(activity, index)))
                                        :
                                        (
                                            <div className="activity" style={{ display: "flex", alignItems: "center" }}>
                                                <CircleX> </CircleX> <p>  No activity found! </p>
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
export default Profile;