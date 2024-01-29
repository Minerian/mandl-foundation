import styles from "./blogCard.module.css";

import DefaultUser from "../../assets/images/default-user.png";
import DefaultImage from "../../assets/images/defaultImage.jpg";
import { Link } from "react-router-dom";

export const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options).replace(/\//g, ".");
};

const BlogCard = ({ item = "" }) => {
  return (
    <>
      <Link
        to={
          item.status === "draft"
            ? "/create-blog?slug=" + item.slug
            : item.status === "submited_to_leader" ||
              item.status === "submited_to_admin"
            ? "/review-blog/" + item.slug
            : "/blog/" + item.slug
        }
        className={styles.blogCard}
      >
        <div>
          <div className={styles.blogCardImage}>
            <img
              src={
                item.cover_photo_path !== "{}" && item.cover_photo_path !== null
                  ? item.cover_photo_path
                  : DefaultImage
              }
              alt=""
            />
          </div>

          <div className={styles.blogCardTag}>{item.category}</div>
          <div className={styles.blogCardTitle}>{item.title}</div>
          <div className={styles.blogCardDescription}>{item.description}</div>
        </div>

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
