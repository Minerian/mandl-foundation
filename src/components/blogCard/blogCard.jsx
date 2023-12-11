import styles from "./blogCard.module.css";

const BlogCard = ({ item = "" }) => {
  return (
    <div className={styles.blogCard}>
      <div className={styles.blogCardImage}>
        <img src={item.image} alt="" />
      </div>

      <div className={styles.blogCardTag}>{item.tag}</div>
      <div className={styles.blogCardTitle}>{item.title}</div>
      <div className={styles.blogCardDescription}>{item.description}</div>

      <div className={styles.blogCardInfo}>
        <div className={styles.blogCardAuthor}>
          <div className={styles.blogCardAuthorImage}>
            <img src={item.authorImage} alt="" />
          </div>

          {item.author}
        </div>
        <div className={styles.blogCardDate}>{item.date}</div>
      </div>
    </div>
  );
};

export default BlogCard;
