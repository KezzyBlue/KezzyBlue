import { motion } from "framer-motion";

const variants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.98,
    },

    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

function AnimatedItem({ children, className = "", delay = 0, duration = 0.35 }) {
    return (
        <motion.div
            className={className}
            variants={variants}
            initial="hidden"
            animate="show"
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}

export default AnimatedItem;