import {motion} from "framer-motion";

const AnimateOnRender = ({children}: { children: React.ReactNode }) => {
    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.8 }}
    >
        {children}
    </motion.div>
};

export default AnimateOnRender;
