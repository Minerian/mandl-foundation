import styles from "./aboutHero.module.css";

import Image1 from "../../../assets/images/aboutImage1.jpg";
import Image2 from "../../../assets/images/aboutImage2.jpg";
import Image3 from "../../../assets/images/aboutImage3.jpg";
import Image4 from "../../../assets/images/aboutImage4.jpg";
import TextImage from "../../../assets/images/textImage.svg";

const AboutHero = () => {
  return (
    <div className={styles.section}>
      <div className="container">
        <h1>About Foundation</h1>

        <p>
          A foundation dedicated to a genuine mission, committed to transforming
          lives and fostering a positive impact worldwide. Our objective is to
          instigate meaningful changes for a better future.
        </p>
      </div>

      <div className={`${styles.images}`}>
        <img src={Image1} alt="" />
        <img src={Image2} alt="" />
        <img src={Image3} alt="" />
        <img src={Image4} alt="" />
      </div>

      <div className={`container ${styles.text}`}>
        What motivates us? The simple belief that everyone deserves consistent
        support. Our focus on <span>education</span>, <span>healthcare</span>,
        and <span>humanitarian aid</span> reflects our commitment to being a
        reliable ally in navigating life's challenges.
      </div>
    </div>
  );
};

export default AboutHero;
