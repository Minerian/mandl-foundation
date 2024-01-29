import BlogCard from "../../../components/blogCard/blogCard";
import styles from "./blogList.module.css";

const BlogList = ({ content, edit }) => {
  return (
    <div className={styles.blogSlider}>
      {content.map((item) => (
        <BlogCard item={item} edit={edit} />
      ))}
    </div>
  );
};

export default BlogList;
