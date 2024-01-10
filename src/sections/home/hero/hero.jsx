import Button from "../../../components/button/button";
import Motion from "../../../components/motion/motion";
import styles from "./hero.module.css";

const Hero = ({
  title = "Transforming Lives Globally",
  desc = "We are here to Liftup Lives through Education, Healthcare and Humanitarian Aid.",
}) => {
  return (
    <section className={styles.section}>
      <Motion>
        <h1>{title}</h1>

        <p>{desc}</p>
        <Button>Become a Partner today</Button>
      </Motion>
    </section>
  );
};

export default Hero;
