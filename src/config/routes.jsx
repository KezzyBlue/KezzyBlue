import Home from "../pages/home/Home.jsx";
import About from "../pages/about/About.jsx";
import Intro from "../pages/about/Intro/Intro.jsx";
import Education from "../pages/about/Education/Education.jsx";
import Hobbies from "../pages/about/Hobbies/Hobbies.jsx";
import Goals from "../pages/about/Goals/Goals.jsx";
import VideoGame from "../pages/about/Hobbies/videoGame/VideoGame.jsx";
import Astronomy from "../pages/about/Hobbies/astronomy/Astronomy.jsx";
import Sport from "../pages/about/Hobbies/sport/Sport.jsx";
import Music from "../pages/about/Hobbies/music/Music.jsx";
import Programming from "../pages/about/Hobbies/programming/Programming.jsx";
import Movie from "../pages/about/Hobbies/movie/Movie.jsx";
import { Navigate } from "react-router-dom";
import HobbiesMain from "../pages/about/Hobbies/hobbiesMain/HobbiesMain.jsx";
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
        showInNavbar: true,

        children: [
            {
                index: true,
                element: <Navigate to="intro" replace />,
                title: "Intro"
            },
            {
                path: "intro",
                element: <Intro />,
                title: "Intro"
            },
            {
                path: "education",
                element: <Education />,
                title: "Education"
            },
            {
                path: "hobbies",
                element: <Hobbies />,
                title: "Hobbies",
                children: [
                    {
                        index: true,
                        element: <HobbiesMain/>,
                        title: "Hobbies main"
                    },
                    {
                        path: "video-game",
                        element: <VideoGame/>,
                        title: "Video game"
                    },
                    {
                        path: "astronomy",
                        element: <Astronomy/>,
                        title: "Astronomy"
                    },
                    {
                        path: "sport",
                        element: <Sport/>,
                        title: "Sport"
                    },
                    {
                        path: "music",
                        element: <Music/>,
                        title: "Music"
                    },
                    {
                        path: "programming",
                        element: <Programming/>,
                        title: "Programming"
                    },
                    {
                        path: "movie",
                        element: <Movie/>,
                        title: "Movie"
                    }
                ]
            },
            {
                path: "Goals",
                element: <Goals />,
                title: "Goals"
            }
        ]
    }
];