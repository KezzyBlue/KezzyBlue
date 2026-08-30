import { motion } from 'framer-motion';

function AboutPageAnimation({ children, className = '', delay = 0, duration = 0.9 }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
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

export default AboutPageAnimation;
