import Home from "../pages/home/Home.jsx";
import About from "../pages/about/About.jsx";
export const routes = [
    {
        path: "/",
        title: "Home 🏠",
        element: <Home />,
        showInNavbar: true
    },
    {
        path: "/about",
        title: "About 🔍",
        element: <About />,
        showInNavbar: true
    }
];