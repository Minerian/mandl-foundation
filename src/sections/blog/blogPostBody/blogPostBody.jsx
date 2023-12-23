import styles from "./blogPostBody.module.css";

import DefaultUser from "../../../assets/images/default-user.png";

const BlogPostBody = ({ post }) => {
  return (
    <div className={`container ${styles.post}`}>
      <div className={styles.blogHeader}>
        <div className={styles.left}>
          <span>Blog</span> / Multiple Images Exampleeeeeeeee
        </div>

        <div className={styles.right}>
          <div className={styles.author}>
            <div className={styles.blogCardAuthorImage}>
              <img
                src={post.authorImage ? post.authorImage : DefaultUser}
                alt=""
              />
            </div>
            Kyslychenko Mykola
          </div>
          <div className={styles.date}>Oct 17, 2023</div>
        </div>
      </div>

      <h2>Multiple Images Exampleeeeeeeee</h2>

      <div dangerouslySetInnerHTML={{ __html: post }} />

      <div className={styles.button}>
        Become a partner
        <svg
          width="28"
          height="29"
          viewBox="0 0 28 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.0833 5.72241V8.05575H18.7717L5.25 21.5774L6.895 23.2224L20.4167 9.70075V17.3891H22.75V5.72241H11.0833Z"
            fill="#F5F5F5"
          />
        </svg>
      </div>
    </div>
  );
};

export default BlogPostBody;
