import styles from "./logosStatic.module.css";

const LogosStatic = ({ list = [], title }) => {
  return (
    <div className={styles.logos}>
      <div className="container">
        <p className={styles.title}>{title}</p>
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

export default LogosStatic;
