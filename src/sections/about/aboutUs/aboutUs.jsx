import styles from "./aboutUs.module.css";

import Image from "../../../assets/images/abousUs.png";

const AboutUs = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title2}>About us</h2>
      <div className={styles.content}>
        <h2>About us</h2>

        <div className={styles.textWrapper}>
          <p>
            Charitable education funds often design and implement educational
            programs and initiatives to address specific needs in the community.
            This could include literacy programs
          </p>

          <p>
            Collaborating with other organizations, government agencies, and
            educational institutions can amplify the impact of charitable
            education funds. Building partnerships facilitates the sharing of
            resources and expertise.
          </p>
        </div>

        <div className={styles.details}>
          <div>
            <div className={styles.detailsLabel}>Year of foundation</div>
            <div className={styles.detailsData}>2024</div>
          </div>
          <div>
            <div className={styles.detailsLabel}>Emploees</div>
            <div className={styles.detailsData}>4</div>
          </div>
          <div>
            <div className={styles.detailsLabel}>Volunteers</div>
            <div className={styles.detailsData}>30</div>
          </div>
          <div>
            <div className={styles.detailsLabel}>Main office</div>
            <div className={styles.detailsData}>Cracow</div>
          </div>
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <img src={Image} alt="" />
      </div>
    </section>
  );
};

export default AboutUs;
