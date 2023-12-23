import styles from "./categoryHero.module.css";

import Image from "../../../assets/images/medicineHero.png";
import Image2 from "../../../assets/images/educationHero.png";
import Image3 from "../../../assets/images/aidHero.png";

const CategoryHero = ({ type }) => {
  return (
    <div className={`container ${styles.section}`}>
      <div className={styles.content}>
        <h1>
          Building sustainable <br /> opportunities{" "}
          <br className={styles.hide} /> universally{" "}
          <br className={styles.brDesk} /> through
          <div className={styles.wrapper}>
            <img
              src={
                type === "medicine"
                  ? Image
                  : type === "education"
                  ? Image2
                  : Image3
              }
              alt=""
            />
            <span>
              {type === "medicine"
                ? "Medicine"
                : type === "education"
                ? "Education"
                : "Humanitarian Aid"}
            </span>
          </div>
        </h1>
      </div>
    </div>
  );
};

export default CategoryHero;
