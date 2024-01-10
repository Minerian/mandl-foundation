import Logo from "../../assets/logo.svg";
import Button from "../button/button";
import styles from "./navigation.module.css";

import DropAll from "../../assets/icons/dropAll.svg";
import DropEducation from "../../assets/icons/dropEducation.svg";
import DropMedicine from "../../assets/icons/dropMedicine.svg";
import DropAid from "../../assets/icons/dropAid.svg";

import Medicine from "../../assets/images/medicine.jpg";
import Education from "../../assets/images/education.jpg";
import Aid from "../../assets/images/aid.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [show, setShow] = useState(false);

  return (
    <div className={` ${styles.navigation}`}>
      <div className="container">
        <div className={styles.navLeft}>
          <div className={styles.logo}>
            <Link to={"/"}>
              <img src={Logo} alt="" />
            </Link>
          </div>

          <div className={styles.items}>
            <div className={styles.navItem}>
              <Link to={"/about"}>About foundation</Link>
            </div>
            <div
              className={styles.navItem}
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              Research{" "}
              <svg
                style={{ transform: show ? "rotate(180deg)" : "rotate(0deg)" }}
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
              <DropDown
                style={{
                  opacity: show ? "1" : "0",
                  pointerEvents: show ? "initial" : "none",
                }}
              />
            </div>
            <div className={styles.navItem}>
              <Link to={"/partners"}>Partners</Link>
            </div>
            <div className={styles.navItem}>
              <Link to={"/faq"}>Frequent Questions</Link>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <Button>Become a Partner today</Button>
          <div className={styles.button}>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;

const DropDown = ({ style }) => {
  const [image, setImage] = useState("");

  const handleChangeImage = (image) => {
    setImage(image);
  };

  return (
    <div className={styles.dropdownWrapper} style={style}>
      <div className={styles.dropdown}>
        <div
          className={styles.dropdownImage}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className={styles.dropdownBody}>
          <Link to="/blog">
            <div
              className={styles.dropdownItem}
              onMouseEnter={() => handleChangeImage("")}
            >
              <img src={DropAll} />
              <div>All</div>
            </div>
          </Link>
          <Link
            to={{
              pathname: "/blog",
            }}
            state={{ type: "Education" }}
          >
            <div
              className={styles.dropdownItem}
              onMouseEnter={() => handleChangeImage(Education)}
            >
              <img src={DropEducation} />
              <div>Education</div>
            </div>
          </Link>
          <Link
            to={{
              pathname: "/blog",
            }}
            state={{ type: "Medicine" }}
          >
            <div
              className={styles.dropdownItem}
              onMouseEnter={() => handleChangeImage(Medicine)}
            >
              <img src={DropMedicine} />
              <div>Medicine</div>
            </div>
          </Link>
          <Link
            to={{
              pathname: "/blog",
            }}
            state={{ type: "Humanitarian aid" }}
          >
            <div
              className={styles.dropdownItem}
              onMouseEnter={() => handleChangeImage(Aid)}
            >
              <img src={DropAid} />
              <div>Humanitarian aid</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
