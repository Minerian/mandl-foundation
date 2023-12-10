import styles from "./logos.module.css";

const Logos = ({ list = [], title }) => {
  return (
    <div className={styles.logos}>
      <div className="container">
        <p>{title}</p>
      </div>

      <div className={`${styles.logosGroupWrapper} container`}>
        <div className={styles.logosGroup}>
          {list.map((item) => (
            <img src={item} />
          ))}
        </div>
        <div className={`${styles.logosGroup} ${styles.logosGroup2}`}>
          {list.map((item) => (
            <img src={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logos;
