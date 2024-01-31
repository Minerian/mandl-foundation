import { useEffect, useState } from "react";
import styles from "./slider.module.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import image1 from "../../../assets/images/sliderImage1.jpg";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from "../../../const/apiUrl";
import { Link } from "react-router-dom";

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
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}posts/`);

        setBlogPosts(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section className={styles.section}>
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{
          x: "0%",
          opacity: 1,
          transition: { duration: 0.5, delay: 0.5 },
        }}
      >
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop
          // navigation
          // pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          // modules={[Autoplay, Pagination, Navigation]}

          pagination={true}
          modules={[Autoplay, Pagination]}
        >
          {blogPosts.map((item, index) => (
            <SwiperSlide>
              <div className={styles.sliderItem}>
                <div className={styles.lines}>
                  <img src={item.cover_photo_path} alt="" />
                </div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.description}>{item.description}</div>

                <Link to={"/blog/" + item.slug} className={styles.readMore}>
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
                </Link>

                <div className={styles.lines}>
                  {/* {content.map((item, index) => (
                <div
                key={index}
                className={`${styles.line} ${
                  sliderIndex === index ? styles.active : ""
                }`}
                ></div>
              ))} */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default Slider;
