import { motion } from "framer-motion";

const Motion = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{
        transform: "translateY(100%)",
        opacity: 0,
      }}
      whileInView={{
        transform: "translateY(0%)",
        opacity: 1,
        transition: { duration: 0.5, delay: delay, ease: "easeInOut" },
      }}
      viewport={{ once: true, margin: "200px" }}
    >
      {children}
    </motion.div>
  );
};

export default Motion;
