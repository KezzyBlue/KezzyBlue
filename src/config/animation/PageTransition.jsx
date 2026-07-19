import { motion } from "framer-motion";
import './PageTransition.css'
export default function PageTransition({ children }) {
    return (
        <motion.div className="container"
            initial={{
                opacity: 0,
                y: 25,
                filter: "blur(6px)"
            }}
            animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)"
            }}
            exit={{
                opacity: 0,
                y: -25,
                filter: "blur(6px)"
            }}
            transition={{
                duration: 0.35,
                ease: "easeOut"
            }}
        >
            {children}
        </motion.div>
    );
}