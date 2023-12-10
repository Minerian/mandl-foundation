import styles from "./button.module.css";

const Button = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className={styles.button}>
      {children}
    </div>
  );
};

export default Button;
