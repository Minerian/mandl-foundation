import styles from "./allPartners.module.css";

import Image1 from "../../../assets/images/allPartner1.png";
import Image2 from "../../../assets/images/allPartner2.png";
import Image3 from "../../../assets/images/allPartner2.png";
import Image4 from "../../../assets/images/allPartner3.png";
import Motion from "../../../components/motion/motion";

const AllPartners = () => {
  return (
    <div className={styles.section}>
      <div className="container">
        <h2>All partners</h2>

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
        <div className={styles.row}>
          <Motion delay={".6"}>
            <img src={Image1} alt="" />
          </Motion>
          <Motion delay={".75"}>
            <img src={Image2} alt="" />
          </Motion>
          <Motion delay={".9"}>
            <img src={Image3} alt="" />
          </Motion>
          <Motion delay={"1.05"}>
            <img src={Image4} alt="" />
          </Motion>
        </div>
      </div>
    </div>
  );
};

export default AllPartners;
