import { Link } from "react-router-dom";
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
            <Link to="/about" className={styles.itemTitle}>
              About us
            </Link>
            <Link to="/partners" className={styles.itemText}>
              Partners
            </Link>
            <Link to="/blog" className={styles.itemText}>
              Blog
            </Link>
            <Link to="/partners" className={styles.itemText}>
              Partnership
            </Link>
            <Link to="/faq" className={styles.itemText}>
              FAQ
            </Link>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>Social</div>
            {/* <div className={styles.itemText}>Youtube</div> */}
            {/* <div className={styles.itemText}>Twitter</div> */}
            <div className={styles.itemText}>
              <a
                href="https://www.linkedin.com/company/themaindlfoundation"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>Contact</div>
            <div className={styles.itemText}>+48889976939</div>
            <div className={styles.itemText}>office@maindl.org</div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>Privacy Policy</p>
        {/* <p>Terms & Conditions</p> */}
        <p>@ 2023 copytighty</p>
      </div>
    </section>
  );
};

export default Footer;
