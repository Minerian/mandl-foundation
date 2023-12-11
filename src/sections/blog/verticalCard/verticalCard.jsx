import Button from "../../../components/button/button";
import styles from "./verticalCard.module.css";

const VerticalCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardLeft}>
        <div>
          <div className={styles.tag}>Medicine</div>
          <div className={styles.title}>Search reimagined in Skiff</div>

          <p>
            We've launched a whole new search experience in Skiff Mail, Pages,
            and Drive.
          </p>
        </div>

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
      </div>

      <div className={styles.imageWrapper}>
        <img
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=3008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </div>
  );
};

export default VerticalCard;
