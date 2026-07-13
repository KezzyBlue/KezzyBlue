import Header from "../header/Header.jsx";
import Navbar from "../navbar/Navbar.jsx";
import Footer from "../footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import './MainLayout.css';
function MainLayout()
{
    return (
        <div className = "layoutContainer">
            <Header> </Header>
            <Navbar> </Navbar>
            <Outlet> </Outlet>
            <Footer> </Footer>
        </div>
    );
}
export default MainLayout;