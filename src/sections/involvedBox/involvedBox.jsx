import Button from "../../components/button/button";

import styles from "./involvedBox.module.css";

const InvolvedBox = () => {
  return (
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
  );
};

export default InvolvedBox;
