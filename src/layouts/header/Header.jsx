import { useEffect, useState } from "react";
import UserInfo from "../../api/user/userinfo/UserInfo.jsx";
import axios from "axios";
import "./Header.css"
import '../../styles/theme.css';
function Header()
{
    const [contact, setContact] = useState([]);

    const fetchContact = async () => {
        const data = await axios.get("user/contact/contact.json");
        setContact(data.data);
    }

    function contactButton(type, index)
    {
        return (
            <a href = {type.link} key = {index}> <img src = {type.icon} className = "icon"/> </a>
        );
    }

    useEffect(() =>{
        fetchContact();
    }, [])
    return (
        <>
        <header>
            <div className = "headerContainer">
                <UserInfo> </UserInfo>
                <div className = "contactContainer">
                    {
                        contact.map((type, index) => contactButton(type, index))
                    }
                </div>
            </div>
        </header>
        </>
    );

}
export default Header;