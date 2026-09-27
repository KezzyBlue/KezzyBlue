import { motion } from 'framer-motion';

function BlogPageAnimation({
    children,
    className = '',
    delay = 0,
    duration = 0.7,
}) {
    return (
        <motion.div
            className={className}
            initial={{
                opacity: 0,
                scale: 0.96,
                filter: 'blur(8px)',
            }}
            animate={{
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
            }}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {children}
        </motion.div>
    );
}

export default BlogPageAnimation;