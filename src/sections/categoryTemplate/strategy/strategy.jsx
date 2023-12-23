import { useEffect, useRef, useState } from "react";
import styles from "./strategy.module.css";

const content = [
  {
    title: "Donations",
    desc: "Like medical funds, charitable education funds rely on fundraising activities to generate financial resources. ",
  },
  {
    title: "Scholarship Programs",
    desc: "Like medical funds, charitable education funds rely on fundraising activities to generate financial resources.",
  },
  {
    title: "Grants",
    desc: "Like medical funds, charitable education funds rely on fundraising activities to generate financial resources. ",
  },
  {
    title: "Grants",
    desc: "Like medical funds, charitable education funds rely on fundraising activities to generate financial resources. ",
  },
];

const Strategy = () => {
  const [padding, setPadding] = useState(0);

  const contentRef = useRef(null);

  useEffect(() => {
    const updatePadding = () => {
      const container = document.querySelector(".container");
      const screenWidth = window.innerWidth;

      if (screenWidth > 810) {
        setPadding(container.getBoundingClientRect().left);
      }
    };

    updatePadding();

    window.addEventListener("resize", updatePadding);

    return () => {
      window.removeEventListener("resize", updatePadding);
    };
  }, []);

  const handleSliderMove = (direction) => {
    const contentWrapper = contentRef.current;

    if (contentWrapper) {
      console.log(
        "WDTH:",
        document.querySelector(".strategy-item").getBoundingClientRect().width
      );
      const scrollDistance = document
        .querySelector(".strategy-item")
        .getBoundingClientRect().width;
      const currentScroll = contentWrapper.scrollLeft;

      if (direction === "left") {
        contentWrapper.scrollLeft = currentScroll - scrollDistance;
      } else if (direction === "right") {
        contentWrapper.scrollLeft = currentScroll + scrollDistance;
      }
    }
  };

  return (
    <div className={styles.section}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.left}>
            <h2>Strategy</h2>
            <p>
              From personalized treatments to innovative technologies, the
              future of medicine holds the promise of a healthier and more
              resilient global population.
            </p>
          </div>

          <div className={styles.right}>
            <svg
              onClick={() => handleSliderMove("left")}
              width="40"
              height="41"
              viewBox="0 0 40 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="-0.5"
                y="0.5"
                width="39"
                height="39"
                rx="7.5"
                transform="matrix(-1 0 0 1 39 0.5)"
                fill="#F9F9F9"
              />
              <rect
                x="-0.5"
                y="0.5"
                width="39"
                height="39"
                rx="7.5"
                transform="matrix(-1 0 0 1 39 0.5)"
                stroke="#ECECEC"
              />
              <path
                d="M16.2951 15.91L17.7051 14.5L23.7051 20.5L17.7051 26.5L16.2951 25.09L20.8751 20.5L16.2951 15.91Z"
                fill="#1A1A1A"
              />
            </svg>

            <svg
              onClick={() => handleSliderMove("right")}
              width="40"
              height="41"
              viewBox="0 0 40 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="-0.5"
                y="0.5"
                width="39"
                height="39"
                rx="7.5"
                transform="matrix(-1 0 0 1 39 0.5)"
                fill="#F9F9F9"
              />
              <rect
                x="-0.5"
                y="0.5"
                width="39"
                height="39"
                rx="7.5"
                transform="matrix(-1 0 0 1 39 0.5)"
                stroke="#ECECEC"
              />
              <path
                d="M16.2951 15.91L17.7051 14.5L23.7051 20.5L17.7051 26.5L16.2951 25.09L20.8751 20.5L16.2951 15.91Z"
                fill="#1A1A1A"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        className={styles.contentWrapper}
        style={{ padding: `0 ${padding}px` }}
        ref={contentRef}
      >
        <div className={styles.content}>
          {content.map((item, index) => (
            <div className={`strategy-item ${styles.item}`}>
              <h3>{item.title}</h3>

              <p className={styles.desc}>{item.desc}</p>

              <div className={styles.line}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
              </div>

              <p>0{index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Strategy;
