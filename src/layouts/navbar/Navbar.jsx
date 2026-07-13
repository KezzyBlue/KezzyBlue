import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { routes } from '../../config/routes.jsx';
function Navbar()
{
    return (
        <div className = "navbarContainer">
                {routes
                    .filter(route => route.showInNavbar)
                    .map(route => (
                        <NavLink key={route.path} to={route.path} className={({ isActive }) => isActive ? "active" : "nonactive"}>
                            {route.title}
                        </NavLink>
                    ))}
        </div>
    );
}
export default Navbar;