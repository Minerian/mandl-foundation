import styles from "./partnersLogos.module.css";

import Image1 from "../../../assets/images/partner1.png";
import Image2 from "../../../assets/images/partner2.png";
import Image3 from "../../../assets/images/partner3.png";
import Image4 from "../../../assets/images/partner4.png";
import Motion from "../../../components/motion/motion";

const PartnersLogo = () => {
  return (
    <div className={styles.section}>
      <div className="container">
        <h2>Recent partners</h2>

        <div className={styles.row}>
          <Motion>
            <img src={Image1} alt="" />
          </Motion>
          <Motion delay={".15"}>
            <img src={Image2} alt="" />
          </Motion>
          <Motion delay={".3"}>
            <img src={Image3} alt="" />
          </Motion>
          <Motion delay={".45"}>
            <img src={Image4} alt="" />
          </Motion>
        </div>
      </div>
    </div>
  );
};

export default PartnersLogo;
