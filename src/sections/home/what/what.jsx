import Button from "../../../components/button/button";
import styles from "./what.module.css";

import ImageCard1 from "../../../assets/images/medicinePeople.png";
import { Link } from "react-router-dom";
import Motion from "../../../components/motion/motion";

const What = () => {
  const checkMark = (
    <svg
      width="12"
      height="9"
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.86339 7.08312L1.08339 4.30312L0.136719 5.24312L3.86339 8.96979L11.8634 0.969785L10.9234 0.0297852L3.86339 7.08312Z"
        fill="#22B416"
      />
    </svg>
  );
  return (
    <section className={styles.section}>
      <h2>What we do</h2>

      <div className={styles.cards}>
        <Motion>
          <div className={`${styles.card} ${styles.card1}`}>
            <div className={styles.cardTitle}>Medicine</div>

            <div className={styles.cardItem}>Medical Outreach Programs</div>
            <div className={styles.cardItem}>Health Education Campaigns</div>
            <div className={styles.cardItem}>Medical Equipment Provision</div>
            <div className={styles.cardItem}>Telemedicine Services</div>

            <div>
              <img src={ImageCard1} alt="" />
            </div>

            <Link to="/medicine">
              <Button>
                Read more{" "}
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.27869 5L6.22119 6.0575L9.65619 9.5L6.22119 12.9425L7.27869 14L11.7787 9.5L7.27869 5Z"
                    fill="#F5F5F5"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </Motion>
        <Motion delay={0.5}>
          <div className={`${styles.card} ${styles.card2}`}>
            <div>
              <div className={styles.cardTitle}>Education</div>

              <div className={styles.cardItem}>
                {checkMark}
                Scholarship Programs
              </div>
              <div className={styles.cardItem}>
                {checkMark} Infrastructure Development
              </div>
              <div className={styles.cardItem}>
                {checkMark} Digital Literacy Initiatives
              </div>
              <div className={styles.cardItem}>
                {checkMark} Teacher Training Programs
              </div>
            </div>
            <Link to="/education">
              <Button>
                Read more{" "}
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.27869 5L6.22119 6.0575L9.65619 9.5L6.22119 12.9425L7.27869 14L11.7787 9.5L7.27869 5Z"
                    fill="#F5F5F5"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </Motion>
        <Motion delay={1}>
          <div className={`${styles.card} ${styles.card3}`}>
            <div className={styles.cardTitle}>Humanitarian aid</div>

            <Link to="/humanitarian-aid">
              <Button>
                Read more{" "}
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.27869 5L6.22119 6.0575L9.65619 9.5L6.22119 12.9425L7.27869 14L11.7787 9.5L7.27869 5Z"
                    fill="#F5F5F5"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </Motion>
      </div>
    </section>
  );
};

export default What;
