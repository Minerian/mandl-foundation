import { useEffect, useState } from "react";
import styles from "./slider.module.css";

import image1 from "../../../assets/images/sliderImage1.jpg";

const content = [
  {
    title: "Heading of article",
    description:
      "They work with healthcare professionals and organizations to deliver essential medical resources",
    image: image1,
  },
  {
    title: "Heading of article1",
    description:
      "They work with healthcare professionals and organizations to deliver essential medical resources",
    image:
      "https://images.unsplash.com/photo-1682685796186-1bb4a5655653?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Heading of article2",
    description:
      "They work with healthcare professionals and organizations to deliver essential medical resources",
    image: image1,
  },
  {
    title: "Heading of article3",
    description:
      "They work with healthcare professionals and organizations to deliver essential medical resources",
    image: image1,
  },
  {
    title: "Heading of article4",
    description:
      "They work with healthcare professionals and organizations to deliver essential medical resources",
    image: image1,
  },
  {
    title: "Heading of article5",
    description:
      "They work with healthcare professionals and organizations to deliver essential medical resources",
    image: image1,
  },
];

const Slider = () => {
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSliderIndex((prevIndex) => (prevIndex + 1) % content.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.sliderItem}>
        <div className={styles.lines}>
          {content.map((item, index) => (
            <img
              src={item.image}
              style={{ opacity: index === sliderIndex ? "1" : "0" }}
              alt=""
            />
          ))}
        </div>
        <div className={styles.title}>{content[sliderIndex].title}</div>
        <div className={styles.description}>
          {content[sliderIndex].description}
        </div>

        <div className={styles.readMore}>
          Read more{" "}
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.73426 4.5752L6.67676 5.6327L10.1118 9.0752L6.67676 12.5177L7.73426 13.5752L12.2343 9.0752L7.73426 4.5752Z"
              fill="#F5F5F5"
            />
          </svg>
        </div>

        <div className={styles.lines}>
          {content.map((item, index) => (
            <div
              key={index}
              className={`${styles.line} ${
                sliderIndex === index ? styles.active : ""
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;
