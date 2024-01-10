import Button from "../../../components/button/button";
import Motion from "../../../components/motion/motion";
import styles from "./hero.module.css";

const Hero = () => {
  return (
    <section className={styles.section}>
      <Motion>
        <h1>Transforming Lives Globally</h1>

        <p>
          We are here to Liftup Lives through Education, Healthcare and
          Humanitarian Aid.
        </p>
        <Button>Become a Partner today</Button>
      </Motion>
    </section>
  );
};

export default Hero;
