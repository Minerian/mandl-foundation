import { useEffect, useRef, useState } from "react";
import styles from "./dashboardBody.module.css";
import BlogCard from "../../../components/blogCard/blogCard";
import BlogList from "../../blog/blogList/blogList";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../../const/apiUrl";
import axios from "axios";
import { UserInfo } from "../dashboardHeader/dashboardHeader";

import DefaultUser from "../../../assets/images/default-user.png";
import DefaultImage from "../../../assets/images/defaultImage.jpg";
import { useErrorContext } from "../../../layout/dashLayout";
import Button from "../../../components/button/button";
import { generateRandomString } from "../../../components/editor/editor";

const tabs = ["Drafts", "Awaiting confirmation", "Published"];
const postStatus = [
  "draft",
  "submited_to_admin",
  "published",
  "submited_to_leader",
];

const DashboardBody = ({ user, type, setType }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [group, setGroup] = useState([]);

  const [groupInfo, setGroupInfo] = useState({});

  const [blogPosts, setBlogPosts] = useState([]);

  const [addTeam, setAddTeam] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  const fetchBlogPosts = async () => {
    const url = `${API_URL}posts/`;

    const token = localStorage.getItem("access_token");

    const headers = {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    };

    const response = await axios.get(url, { headers });

    setBlogPosts(response.data);
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const { handleError } = useErrorContext();

  useEffect(() => {
    if (type === "admin") {
      const makeApiCall = async () => {
        try {
          const token = localStorage.getItem("access_token");

          const headers = {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.post(
            `${API_URL}groups/groupping`,
            {},
            {
              headers,
            }
          );

          setGroup(response.data);
        } catch (error) {
          handleError(error);
        }
      };

      makeApiCall();
    } else if (type === "leader") {
      const handleGetGroup = async () => {
        try {
          const accessToken = localStorage.getItem("access_token");

          const response = await axios.get(
            `http://3.79.237.102/groups/${user.group_id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                accept: "application/json",
              },
            }
          );

          setGroupInfo(response.data);
        } catch (error) {
          console.error("Error retrieving group:", error.response.data);
        }
      };

      const handleGetUsers = async () => {
        try {
          const accessToken = localStorage.getItem("access_token");

          const response = await axios.get("http://3.79.237.102/user/", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              accept: "application/json",
            },
          });

          setGroup(response.data);
        } catch (error) {
          handleError(error);
        }
      };

      handleGetGroup();
      handleGetUsers();
    }
  }, []);

  return (
    <>
      <div
        className={`${
          type === "admin" || type === "leader" ? styles.adminBody : ""
        }`}
      >
        {type === "admin" && (
          <div className={styles.adminSide}>
            <div className={styles.adminSideTop}>
              <div>Dashboard</div>
              <div>All teams</div>
            </div>

            <div className={styles.adminSideBody}>
              <div className={styles.adminRow}>
                <div>Teams</div>

                <svg
                  onClick={() => setAddTeam(true)}
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="0.696289"
                    width="16"
                    height="16"
                    rx="3"
                    fill="#ECECEC"
                  />
                  <path
                    d="M11.9987 9.36312H8.66536V12.6965C8.66536 13.0631 8.36536 13.3631 7.9987 13.3631C7.63203 13.3631 7.33203 13.0631 7.33203 12.6965V9.36312H3.9987C3.63203 9.36312 3.33203 9.06312 3.33203 8.69645C3.33203 8.32979 3.63203 8.02979 3.9987 8.02979H7.33203V4.69645C7.33203 4.32979 7.63203 4.02979 7.9987 4.02979C8.36536 4.02979 8.66536 4.32979 8.66536 4.69645V8.02979H11.9987C12.3654 8.02979 12.6654 8.32979 12.6654 8.69645C12.6654 9.06312 12.3654 9.36312 11.9987 9.36312Z"
                    fill="#767676"
                  />
                </svg>
              </div>
              {Object.entries(group).map(([key, values]) => (
                <Group keyLabel={key} key={key} values={values} type={type} />
              ))}
            </div>

            <div
              className={styles.adminProfile}
              onClick={() => setType("user")}
            >
              <UserInfo user={user} />
            </div>
          </div>
        )}
        {type === "leader" && (
          <div className={`${styles.adminSide} ${styles.leaderSide}`}>
            <div className={styles.adminSideTop}>
              <img
                src={
                  groupInfo.group_photo_path
                    ? groupInfo.group_photo_path
                    : DefaultImage
                }
                alt=""
              />
              <div>{groupInfo.group_name}</div>
              <div>All team articles</div>
            </div>

            <div className={styles.adminSideBody}>
              <div className={styles.adminRow}>
                <div>Team members</div>
              </div>

              <Group values={group} type={type} />
            </div>

            <div
              className={styles.adminProfile}
              onClick={() => setType("user")}
            >
              <UserInfo user={user} />
            </div>
          </div>
        )}
        <div className={styles.body}>
          <h2
            className={`${
              type === "admin" || type === "leader" ? styles.adminTitle : ""
            }`}
          >
            {type === "admin" || type === "leader"
              ? "Awaiting confirmation"
              : "Your stories"}
          </h2>

          {type !== "admin" && type !== "leader" && (
            <div className={styles.tabs}>
              {tabs.map((item, index) => (
                <div
                  className={styles.tab}
                  onClick={() => setTabIndex(index)}
                  style={{
                    borderBottom:
                      tabIndex === index
                        ? "1px solid #88ACB2"
                        : "1px solid transparent",
                    color: tabIndex === index ? "#88ACB2" : "",
                  }}
                >
                  {item} (
                  {
                    blogPosts.filter((post) =>
                      index === 1
                        ? (post.status === postStatus[index] ||
                            post.status === postStatus[3]) &&
                          post.user_id === user.id
                        : post.status === postStatus[index] &&
                          post.user_id === user.id
                    ).length
                  }
                  )
                </div>
              ))}
            </div>
          )}

          <BlogList
            content={blogPosts.filter((post) =>
              type === "admin" || type === "leader"
                ? post.status === postStatus[1] || post.status === postStatus[3]
                : tabIndex === 1
                ? (post.status === postStatus[tabIndex] ||
                    post.status === postStatus[3]) &&
                  post.user_id === user.id
                : post.status === postStatus[tabIndex] &&
                  post.user_id === user.id
            )}
          />
        </div>
      </div>

      {addTeam && <AddTeamPopup close={() => setAddTeam(false)} />}
    </>
  );
};

export default DashboardBody;

const Group = ({ keyLabel, values, type }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.group}>
      {type === "admin" && (
        <div
          className={styles.groupTitle}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div>{keyLabel === "without_group" ? "Without group" : keyLabel}</div>

          <svg
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9055 6.94643L8.99547 9.85643L6.08547 6.94643C5.79297 6.65393 5.32047 6.65393 5.02797 6.94643C4.73547 7.23893 4.73547 7.71143 5.02797 8.00393L8.47047 11.4464C8.76297 11.7389 9.23547 11.7389 9.52797 11.4464L12.9705 8.00393C13.263 7.71143 13.263 7.23893 12.9705 6.94643C12.678 6.66143 12.198 6.65393 11.9055 6.94643Z"
              fill="#1A1A1A"
            />
          </svg>
        </div>
      )}
      {(open || type !== "admin") && (
        <div className={styles.groupList}>
          <UserItem
            list={values.filter((value) => value.role === "leader")}
            userType={"leader"}
            type={type}
          />
          <UserItem
            list={values.filter((value) => value.role !== "leader")}
            userType={"Researchers"}
            type={type}
          />
        </div>
      )}
    </div>
  );
};

const UserItem = ({ list = [], type, userType }) => {
  return (
    <>
      {list.length > 0 && (
        <div className={styles.userLabel}>
          {userType === "leader" ? (
            <>
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.90667 1.863L4.96 2.123L5.17333 3.19633H8.66667V7.19633H6.42667L6.37333 6.93633L6.16 5.863H1.33333V1.863H4.90667ZM6 0.529663H0V11.863H1.33333V7.19633H5.06667L5.33333 8.52966H10V1.863H6.26667L6 0.529663Z"
                  fill="#767676"
                />
              </svg>
              Leader
            </>
          ) : (
            <>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 14.1971H4.5L11.8733 6.82377L9.37333 4.32377L2 11.6971V14.1971ZM3.33333 12.2504L9.37333 6.21043L9.98667 6.82377L3.94667 12.8638H3.33333V12.2504Z"
                  fill="#767676"
                />
                <path
                  d="M12.2467 2.39043C11.9867 2.13043 11.5667 2.13043 11.3067 2.39043L10.0867 3.61043L12.5867 6.11043L13.8067 4.89043C14.0667 4.63043 14.0667 4.21043 13.8067 3.95043L12.2467 2.39043Z"
                  fill="#767676"
                />
              </svg>
              Researchers
            </>
          )}
        </div>
      )}
      {list.map((value, index) => (
        <User key={index} value={value} userType={userType} type={type} />
      ))}
    </>
  );
};

const User = ({ value, userType, type }) => {
  const [action, setAction] = useState(false);

  const actionRef = useRef(null);

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

  const { handleError } = useErrorContext();

  const handleRemove = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");

      const response = await axios.delete(
        `http://3.79.237.102/user/${value.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: "application/json",
          },
        }
      );

      window.location.reload();
    } catch (error) {
      handleError(error);
    }
  };

  const handlePromote = async (isLeader) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      const formData = new FormData();
      formData.append("role", isLeader ? "leader" : "publisher");

      const response = await axios.put(
        `http://3.79.237.102/user/${value.user_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Promotion successful:", response.data);

      window.location.reload();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className={styles.groupUser}>
      <div>
        <div className={styles.avatar}>
          <img src={value.avatar ? value.avatar : DefaultUser} alt="" />
        </div>
        <p>{value.username}</p>
      </div>

      {(userType !== "leader" || type === "admin") && type !== "leader" && (
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
      )}

      {action && (
        <div className={styles.changeStatus} ref={actionRef}>
          {
            <div onClick={() => handlePromote(userType !== "leader")}>
              <svg
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.48479 1.64296L5.53812 1.90296L5.75146 2.9763H9.24479V6.9763H7.00479L6.95146 6.7163L6.73813 5.64296H1.91146V1.64296H5.48479ZM6.57813 0.309631H0.578125V11.643H1.91146V6.9763H5.64479L5.91146 8.30963H10.5781V1.64296H6.84479L6.57813 0.309631Z"
                  fill="#1A1A1A"
                />
              </svg>
              {userType !== "leader" ? "Make" : "Remove"} a leader
            </div>
          }
          <div onClick={handleRemove}>
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.24544 6.30963V7.64296H10.9121V6.30963H4.24544ZM7.57878 0.309631C3.89878 0.309631 0.912109 3.2963 0.912109 6.9763C0.912109 10.6563 3.89878 13.643 7.57878 13.643C11.2588 13.643 14.2454 10.6563 14.2454 6.9763C14.2454 3.2963 11.2588 0.309631 7.57878 0.309631ZM7.57878 12.3096C4.63878 12.3096 2.24544 9.9163 2.24544 6.9763C2.24544 4.0363 4.63878 1.64296 7.57878 1.64296C10.5188 1.64296 12.9121 4.0363 12.9121 6.9763C12.9121 9.9163 10.5188 12.3096 7.57878 12.3096Z"
                fill="#FF5151"
              />
            </svg>
            Remove member
          </div>
        </div>
      )}
    </div>
  );
};

const AddTeamPopup = ({ close }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(DefaultImage);
  const [groupName, setGroupName] = useState("");

  const { handleError } = useErrorContext();

  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImagePreview(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleAddGroup = async () => {
    if (loading) return;

    try {
      if (!groupName || !fileInputRef.current.files[0]) {
        alert("Please fill in both inputs.");
        return;
      }

      setLoading(true);

      const token = localStorage.getItem("access_token");

      const formData = new FormData();
      const randomFileName = generateRandomString(20);
      formData.append("group_name", groupName);
      formData.append(
        "image_file",
        fileInputRef.current.files[0],
        randomFileName
      );

      const headers = {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post(
        "http://3.79.237.102/groups/",
        formData,
        {
          headers,
        }
      );

      console.log("Group added successfully:", response.data);

      setGroupName("");
      setImagePreview(DefaultImage);
      setLoading(false);

      window.location.reload();
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.teamPopupOverlay}>
      <div className={styles.teamPopup}>
        <svg
          className={styles.closePopup}
          onClick={close}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
            fill="#1A1A1A"
          />
        </svg>

        <div className={styles.popupLabel}>Team profile</div>
        <div className={styles.popupOptionLabel}>Team Logo</div>

        <div className={styles.imageBox} onClick={handleClickUpload}>
          <div className={styles.imageWrapper}>
            <img src={imagePreview} alt="" />
          </div>
          <div className={styles.imageBoxInfo}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 8.25V10.5H1.5V8.25H0V10.5C0 11.325 0.675 12 1.5 12H10.5C11.325 12 12 11.325 12 10.5V8.25H10.5ZM2.25 3.75L3.3075 4.8075L5.25 2.8725V9H6.75V2.8725L8.6925 4.8075L9.75 3.75L6 0L2.25 3.75Z"
                fill="#1A1A1A"
              />
            </svg>
            <div>Upload photo</div>

            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div>
          <div className={styles.popupOptionLabel}>Team name</div>

          <input
            type="text"
            placeholder="Enter team name"
            value={groupName}
            onChange={handleGroupNameChange}
          />
        </div>

        <div className={styles.popupButton}>
          <Button onClick={handleAddGroup}>Add Group</Button>
        </div>
      </div>
    </div>
  );
};
