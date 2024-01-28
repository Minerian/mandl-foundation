import React, { useState } from "react";
import Logo from "../../assets/maindlLogo.png";
import styles from "./navigationMob.module.css";
import Button from "../button/button";

import DropAll from "../../assets/icons/dropAll.svg";
import DropEducation from "../../assets/icons/dropEducation.svg";
import DropMedicine from "../../assets/icons/dropMedicine.svg";
import DropAid from "../../assets/icons/dropAid.svg";
import { Link } from "react-router-dom";

const NavigationMob = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`${styles.navigation}`}>
        <div className="container">
          <img src={Logo} alt="" />
          <div className={styles.hamburgerMenu} onClick={toggleMenu}>
            <div
              className={`${styles.hamburgerIcon} ${isOpen ? styles.open : ""}`}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${styles.menuItems}`}
        style={{ transform: isOpen ? "translateY(0%)" : "translateY(-120%)" }}
      >
        <div className="container">
          <div className={styles.buttons}>
            <Link to="https://calendly.com/maindlfoundation/partner">
              <Button>Become a Partner today</Button>
            </Link>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
          <div className={styles.itemsGroup}>
            <Link to="/about" className={styles.item}>
              About foundatiion
            </Link>
            <div className={styles.item}>
              <div
                className={styles.itemRow}
                onClick={() => setShow((prev) => !prev)}
              >
                Research{" "}
                <svg
                  style={{
                    transform: show ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.36201 0.325332L4.45201 3.23533L1.54201 0.325332C1.24951 0.032832 0.777012 0.032832 0.484512 0.325332C0.192012 0.617832 0.192012 1.09033 0.484512 1.38283L3.92701 4.82533C4.21951 5.11783 4.69201 5.11783 4.98451 4.82533L8.42701 1.38283C8.71951 1.09033 8.71951 0.617832 8.42701 0.325332C8.13451 0.040332 7.65451 0.032832 7.36201 0.325332Z"
                    fill="#767676"
                  />
                </svg>
              </div>

              {show && (
                <div className={styles.dropdownBody}>
                  <Link to="/blog" className={styles.dropdownItem}>
                    <img src={DropAll} />
                    <div>All</div>
                  </Link>
                  <Link
                    to={{ pathname: "/blog" }}
                    state={{ type: "Education" }}
                    className={styles.dropdownItem}
                  >
                    <img src={DropEducation} />
                    <div>Education</div>
                  </Link>
                  <Link
                    to={{ pathname: "/blog" }}
                    state={{ type: "Medicine" }}
                    className={styles.dropdownItem}
                  >
                    <img src={DropMedicine} />
                    <div>Medicine</div>
                  </Link>
                  <Link
                    to={{ pathname: "/blog" }}
                    state={{ type: "Humanitarian aid" }}
                    className={styles.dropdownItem}
                  >
                    <img src={DropAid} />
                    <div>Humanitarian aid</div>
                  </Link>
                </div>
              )}
            </div>
            <Link to="/partners" className={styles.item}>
              Partners
            </Link>
            <Link to="/faq" className={styles.item}>
              Frequent Questions
            </Link>
          </div>
          <div className={styles.navBottom}>
            <div className={styles.navBottomLeft}>
              <div className={styles.navBottomLabel}>Social</div>

              <div className={styles.navBottomSocials}>
                <div>Youtube</div>
                <div>Twitter</div>
                <div>LinkedIn</div>
              </div>
            </div>
            <div className={styles.navBottomRight}>
              <div className={styles.navBottomLabel}>Contact</div>

              <div className={styles.navBottomSocials}>
                <div>+38(066)-111-59-21</div>
                <div>mailmail@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationMob;
