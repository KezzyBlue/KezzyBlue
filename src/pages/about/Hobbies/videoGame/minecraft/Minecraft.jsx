import { useState, useEffect } from "react";
import axios from "axios";
import './Minecraft.css';
function Minecraft() {
    const userUUID = "631269a2-47d5-455e-844f-c312b955d836";
    const [user, setUser] = useState(null);


    const fetchUser = async () => {
        const response = await axios.get(`https://mc-api.io/profile/${userUUID}`);
        setUser(response.data);
    }

    useEffect(() => {
        fetchUser();
    }, [])


    if (!user) return (<h1> Loading </h1>);

    return (<>
        <h1> Minecraft </h1>
        <div className="minecraftContainer">
            <div className="minecraftUserSkin">
                <img src={`https://mc-heads.net/body/${user.name}`} className="skin" />
            </div>

            <div className="minecraftLine"> </div>

            <div className="minecraftUserInfo">
                <h1> {user.name} </h1>
                <p className = "premium"> ● PROFILE VERIFIED</p>
                <div className = "uuid"> 
                    <h1> UUID: </h1>
                    <p style = {{color: "var(--text0)"}}> {user.uuid} </p>
                </div>

                <div className = "skinUrl">
                    <h1> Skin: </h1>
                    <div className = "linkSkin">
                        <a href = {user.decodedTexture.textures.SKIN.url} target="_blank" rel="noopener noreferrer"> http://textures.minecraft.net/texture/51e0b3c29d79ede39... </a>
                    </div>
                </div>

                <div className = "hor-line"></div>

                <h1> Owned: </h1>

                <div className = "gameOwned">
                    <p className = "owned"> ● Minecraft: Java edition </p>
                    <p className = "owned"> ● Minecraft: Bedrock edition </p>
                </div>

            </div>
        </div>
    </>);
}
export default Minecraft;