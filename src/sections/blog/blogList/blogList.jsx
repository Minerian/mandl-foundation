import BlogCard from "../../../components/blogCard/blogCard";
import styles from "./blogList.module.css";

const BlogList = ({ content }) => {
  return (
    <div className={styles.blogSlider}>
      {content.map((item) => (
        <BlogCard item={item} />
      ))}
    </div>
  );
};

export default BlogList;
