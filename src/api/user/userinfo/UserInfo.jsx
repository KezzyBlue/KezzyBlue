import axios from "axios";
import { use, useDebugValue, useEffect, useState } from "react";
import './UserInfo.css';
import '../../../styles/theme.css'

import {X} from 'lucide-react'

import Profile from "../profileDiscord/profile.jsx";
function UserInfo() {
    const userId = "812486503572832327";
    const [userData, setUserData] = useState(null);
    const [avatarFrame, setAvatarFrame] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [introduce, setIntroduce] = useState("");

    const fetchIntroduce = async () => {
        try {
            const response = await axios.get("/user/introduce/introduce.json");
            setIntroduce(response.data.about);
        }
        catch (error) {
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

    const [showExtend, setShowExtend] = useState(false);

    if(!introduce || !userData)
    {
        return ( <> Loading.... </>);
    }

    return (
        <>

            <div className="userInfoContainer">
                <div className="avatarContainer" onClick={() => setShowExtend(prev => !prev)}>
                    <img src={avatar} className="avatar" />
                    <img src={avatarFrame} className="avatarFrame" />
                    <div className={`status ${userData?.discord_status}`}>
                        {userData?.discord_status === "online" && (<div className="pulse"></div>)}
                    </div>
                    <div className = "avatarToolTip"> Click my avatar </div>
                </div>
                <div className="userInfo">
                    <h1> Yup, KezzyBlue here!! </h1>
                    <div className="line"> </div>
                    <p className="introduce">  {introduce} </p>
                </div>
            </div>
            {
                showExtend && (
                    <>
                        <Profile></Profile>
                        <button className = "closeExtendButton" onClick = {() => setShowExtend(false)}> <X/> </button>
                    </>
                )
            }
        </>

    );
}
export default UserInfo;