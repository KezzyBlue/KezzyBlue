import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../../config/animation/PageTransition.jsx";

function AnimatedOutlet() {
    const location = useLocation();
    const outlet = useOutlet();
    const topLevelPath = `/${location.pathname.split('/').filter(Boolean)[0] || ''}`;

    return (
        <AnimatePresence mode = "wait">
            <PageTransition key = {topLevelPath}>
                {outlet}
            </PageTransition>
        </AnimatePresence>
    );
}

export default AnimatedOutlet;