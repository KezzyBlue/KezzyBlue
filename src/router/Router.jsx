import {Routes, Route} from "react-router-dom";
import { routes } from "../config/routes.jsx";
import MainLayout from "../layouts/main/MainLayout.jsx";

function Router()
{
    return (
        <Routes>
            <Route element = {<MainLayout/>}>
                {
                    routes.map((route) => (
                        <Route key = {route.path} path = {route.path} element = {route.element}/>
                    ))
                }
            </Route>
        </Routes>
    );
}
export default Router;