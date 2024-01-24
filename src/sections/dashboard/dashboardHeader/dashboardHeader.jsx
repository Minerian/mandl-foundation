import { Link } from "react-router-dom";
import styles from "./dashboardHeader.module.css";

import Logo from "../../../assets/logo.svg";

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
            onClick={() => {
              if (user.role === "admin") {
                setType("admin");
              } else if (user.role === "leader") {
                setType("leader");
              }
            }}
            style={{
              cursor:
                user.role === "admin" || user.role === "leader"
                  ? "pointer"
                  : "",
            }}
          >
            <UserInfo user={user} />
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

export const UserInfo = ({ user }) => {
  return (
    <>
      {user.profile_image_path && (
        <div className={styles.profileImage}>
          <img src={`${user.profile_image_path}`} alt="" />
        </div>
      )}

      <div>
        <div className={styles.name}>{user.username}</div>
        <div className={styles.email}>{user.email}</div>
      </div>
    </>
  );
};
