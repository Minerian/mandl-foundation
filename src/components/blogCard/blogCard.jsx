import styles from "./blogCard.module.css";

import DefaultUser from "../../assets/images/default-user.png";
import { Link } from "react-router-dom";

const BlogCard = ({ item = "" }) => {
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options).replace(/\//g, ".");
  };

  return (
    <>
      <Link to={"/blog/" + item.slug} className={styles.blogCard}>
        <div className={styles.blogCardImage}>
          <img src={item.cover_photo_path} alt="" />
        </div>

        <div className={styles.blogCardTag}>{item.category}</div>
        <div className={styles.blogCardTitle}>{item.title}</div>
        <div className={styles.blogCardDescription}>{item.description}</div>

        <div className={styles.blogCardInfo}>
          <div className={styles.blogCardAuthor}>
            <div className={styles.blogCardAuthorImage}>
              <img
                src={item.authorImage ? item.authorImage : DefaultUser}
                alt=""
              />
            </div>

            {item.author}
          </div>
          <div className={styles.blogCardDate}>
            {formatDate(item.created_at)}
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
