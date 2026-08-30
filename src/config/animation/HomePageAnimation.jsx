import { motion } from 'framer-motion';

function HomePageAnimation({
    children,
    className = '',
    delay = 0,
    duration = 0.45,
    direction = 'left',
}) {
    const xOffset = direction === 'right' ? 80 : -80;

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, x: xOffset }}
            animate={{ opacity: 1, x: 0 }}
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

export default HomePageAnimation;
