import Logo from "../../assets/logo.svg";

import styles from "./footer.module.css";

const Footer = () => {
  return (
    <section>
      <div className={styles.footerTop}>
        <div className={styles.footerLeft}>
          <img src={Logo} alt="" />

          <p>Heartfelt Giving, Global Impact.</p>
        </div>

        <div className={styles.footerRight}>
          <div className={styles.item}>
            <div className={styles.itemTitle}>About us</div>
            <div className={styles.itemText}>Partners</div>
            <div className={styles.itemText}>Blog</div>
            <div className={styles.itemText}>Partnership</div>
            <div className={styles.itemText}>FAQ</div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>Social</div>
            <div className={styles.itemText}>Youtube</div>
            <div className={styles.itemText}>Twitter</div>
            <div className={styles.itemText}>LinkedIn</div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>Contact</div>
            <div className={styles.itemText}>+38(066)-111-59-21</div>
            <div className={styles.itemText}>mailmail@gmail.com</div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>Privacy Policy</p>
        <p>Terms & Conditions</p>
        <p>@ 2023 copytighty</p>
      </div>
    </section>
  );
};

export default Footer;
