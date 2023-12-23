import { useEffect, useState } from "react";
import styles from "./blogHero.module.css";

const content = ["All", "Medicine", "Education", "Humanitarian aid"];

const BlogHero = ({ fetch, type = "All" }) => {
  const [activeButton, setActiveButton] = useState();

  useEffect(() => {
    setActiveButton(type);
  }, []);

  return (
    <div className={styles.section}>
      <h1>Research from our Foundation</h1>
      <p>
        Knowledge for Compassion: Explore Our Foundation's Research Journey in
        Education, Medicine, and Humanitarian Aid
      </p>

      <div className={styles.buttons}>
        {content.map((item, index) => (
          <div
            onClick={() => {
              setActiveButton(item);
              fetch(item);
            }}
            key={index}
            className={`${activeButton === item ? styles.active : ""}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogHero;
