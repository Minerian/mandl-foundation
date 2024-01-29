import { useEffect, useState } from "react";
import BlogCard from "../../components/blogCard/blogCard";
import styles from "./blogSlider.module.css";
import { API_URL } from "../../const/apiUrl";
import axios from "axios";

const BlogSlider = ({ posts }) => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}posts/`);

        setBlogPosts(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  const [padding, setPadding] = useState(0);

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
    const container = document.querySelector(".blogSliderWrapper");
    const totalWidth = container.scrollWidth;
    const sliderWidth = container.children[0].children[0].offsetWidth;

    let newPosition =
      direction === "left"
        ? container.scrollLeft - sliderWidth
        : container.scrollLeft + sliderWidth;

    if (newPosition + container.offsetWidth > totalWidth)
      newPosition = totalWidth;

    if (newPosition < 0) newPosition = 0;

    container.scrollTo({ left: newPosition, behavior: "smooth" });
  };

  return (
    <div className={styles.section}>
      <div className={`${styles.sectionTop} container`}>
        <h2>Research from our foundation</h2>

        <div className={styles.navItems}>
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

      <div
        className={`blogSliderWrapper ${styles.blogSliderWrapper}`}
        style={{ padding: `0 ${padding}px` }}
      >
        <div className={styles.blogSlider}>
          {blogPosts.map((item) => (
            <BlogCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSlider;
