import Button from "../../components/button/button";

import styles from "./involvedBox.module.css";

import { motion } from "framer-motion";

const InvolvedBox = () => {
  return (
    <motion.div
      initial={{
        transform: "translateX(-100%)",
        opacity: 0,
      }}
      whileInView={{
        transform: "translateX(0%)",
        opacity: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      viewport={{ once: true }}
    >
      <section className={styles.section}>
        <h2>Get Involved now</h2>

        <div className={styles.bottom}>
          <p>Discover How You Can Contribute to Positive Change.</p>

          <div>
            <Button>Become a partner</Button>
            <Button>Become a volunteer</Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default InvolvedBox;
