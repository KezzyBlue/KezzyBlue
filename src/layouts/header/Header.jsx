import UserInfo from "../../api/UserInfo.jsx";
import "./Header.css"
function Header()
{
    return (
        <>
        <header>
            <div className = "headerContainer">
                <UserInfo> </UserInfo>
            </div>
        </header>
        </>
    );

}
export default Header;