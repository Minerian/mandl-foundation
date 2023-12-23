import { Link } from "react-router-dom";
import Button from "../../../components/button/button";
import styles from "./verticalCard.module.css";

const VerticalCard = ({ post }) => {
  console.log(post);
  return (
    <div className={styles.card}>
      <div className={styles.cardLeft}>
        <div>
          <div className={styles.tag}>{post.category}</div>
          <div className={styles.title}>{post.title}</div>

          <p>{post.description}</p>
        </div>

        <Link to={"/blog/" + post.slug}>
          <Button>
            Read more{" "}
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.9452 4.5752L6.8877 5.6327L10.3227 9.0752L6.8877 12.5177L7.9452 13.5752L12.4452 9.0752L7.9452 4.5752Z"
                fill="#F5F5F5"
              />
            </svg>
          </Button>
        </Link>
      </div>

      <div className={styles.imageWrapper}>
        <img src={post.cover_photo_path} alt="" />
      </div>
    </div>
  );
};

export default VerticalCard;
