import { Link, useNavigate } from "react-router-dom";
import styles from "./dashboardHeader.module.css";

import Logo from "../../../assets/logo.svg";
import { useRef, useState } from "react";
import { API_URL } from "../../../const/apiUrl";
import axios from "axios";

const DashboardHeader = ({ user, type, setType }) => {
  return (
    <div className={styles.header}>
      <div
        className={`${styles.left} ${
          type === "admin" || type === "leader" ? styles.leftAdmin : ""
        }`}
      >
        {type === "admin" || type === "leader" ? (
          <img className={styles.logo} src={Logo} alt="" />
        ) : (
          <div
            style={{
              cursor:
                user.role === "admin" || user.role === "leader"
                  ? "pointer"
                  : "",
            }}
          >
            <UserInfo
              user={user}
              onClick={() => {
                if (user.role === "admin") {
                  setType("admin");
                } else if (user.role === "leader") {
                  setType("leader");
                }
              }}
            />
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        <Link
          to="/create-blog"
          className={`${styles.button} ${styles.button1}`}
        >
          Add article{" "}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0.0644531C3.86 0.0644531 0.5 3.42445 0.5 7.56445C0.5 11.7045 3.86 15.0645 8 15.0645C12.14 15.0645 15.5 11.7045 15.5 7.56445C15.5 3.42445 12.14 0.0644531 8 0.0644531ZM11.75 8.31445H8.75V11.3145H7.25V8.31445H4.25V6.81445H7.25V3.81445H8.75V6.81445H11.75V8.31445Z"
              fill="#F5F5F5"
            />
          </svg>
        </Link>
        <div className={`${styles.button} ${styles.button2}`}>
          Import an article{" "}
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.25 8.31445V12.0645C12.25 12.477 11.9125 12.8145 11.5 12.8145H2.5C2.0875 12.8145 1.75 12.477 1.75 12.0645V8.31445C1.75 7.90195 1.4125 7.56445 1 7.56445C0.5875 7.56445 0.25 7.90195 0.25 8.31445V12.8145C0.25 13.6395 0.925 14.3145 1.75 14.3145H12.25C13.075 14.3145 13.75 13.6395 13.75 12.8145V8.31445C13.75 7.90195 13.4125 7.56445 13 7.56445C12.5875 7.56445 12.25 7.90195 12.25 8.31445ZM7.75 8.06695L9.16 6.65695C9.4525 6.36445 9.925 6.36445 10.2175 6.65695C10.51 6.94945 10.51 7.42195 10.2175 7.71445L7.525 10.407C7.2325 10.6995 6.76 10.6995 6.4675 10.407L3.775 7.71445C3.4825 7.42195 3.4825 6.94945 3.775 6.65695C4.0675 6.36445 4.54 6.36445 4.8325 6.65695L6.25 8.06695V1.56445C6.25 1.15195 6.5875 0.814453 7 0.814453C7.4125 0.814453 7.75 1.15195 7.75 1.56445V8.06695Z"
              fill="#F5F5F5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

export const UserInfo = ({ user, onClick }) => {
  const navigate = useNavigate();

  const actionRef = useRef(null);
  const [action, setAction] = useState(false);

  const handleAction = () => {
    const handleClickOutside = (event) => {
      if (actionRef.current && !actionRef.current.contains(event.target)) {
        setAction(false);
        document.removeEventListener("click", handleClickOutside);
      }
    };

    setAction((prev) => {
      if (!prev) {
        setTimeout(() => {
          document.addEventListener("click", handleClickOutside);
        }, 10);
      }

      return true;
    });
  };

  const handleLogout = async () => {
    const authToken = localStorage.getItem("access_token");

    if (authToken) {
      localStorage.removeItem("access_token");

      navigate("/");
    }
  };

  return (
    <div className={styles.userProfilInfo}>
      <div onClick={onClick}>
        {user.profile_image_path && (
          <div className={styles.profileImage}>
            <img src={`${user.profile_image_path}`} alt="" />
          </div>
        )}

        <div>
          <div className={styles.name}>{user.username}</div>
          <div className={styles.email}>{user.email}</div>
        </div>
      </div>

      <svg
        onClick={handleAction}
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.0013 5.52946C8.73464 5.52946 9.33464 4.92946 9.33464 4.19613C9.33464 3.46279 8.73464 2.86279 8.0013 2.86279C7.26797 2.86279 6.66797 3.46279 6.66797 4.19613C6.66797 4.92946 7.26797 5.52946 8.0013 5.52946ZM8.0013 6.86279C7.26797 6.86279 6.66797 7.46279 6.66797 8.19613C6.66797 8.92946 7.26797 9.52946 8.0013 9.52946C8.73464 9.52946 9.33464 8.92946 9.33464 8.19613C9.33464 7.46279 8.73464 6.86279 8.0013 6.86279ZM8.0013 10.8628C7.26797 10.8628 6.66797 11.4628 6.66797 12.1961C6.66797 12.9295 7.26797 13.5295 8.0013 13.5295C8.73464 13.5295 9.33464 12.9295 9.33464 12.1961C9.33464 11.4628 8.73464 10.8628 8.0013 10.8628Z"
          fill="#1A1A1A"
        />
      </svg>

      {action && (
        <div ref={actionRef} className={styles.logoutPopup}>
          <div onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M116,216a12,12,0,0,1-12,12H48a20,20,0,0,1-20-20V48A20,20,0,0,1,48,28h56a12,12,0,0,1,0,24H52V204h52A12,12,0,0,1,116,216Zm108.49-96.49-40-40a12,12,0,0,0-17,17L187,116H104a12,12,0,0,0,0,24h83l-19.52,19.51a12,12,0,0,0,17,17l40-40A12,12,0,0,0,224.49,119.51Z"></path>
            </svg>
            <div>Logout</div>
          </div>
        </div>
      )}
    </div>
  );
};
