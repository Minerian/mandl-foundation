import { useEffect, useRef, useState } from "react";
import styles from "./dashboardBody.module.css";
import BlogCard from "../../../components/blogCard/blogCard";
import BlogList from "../../blog/blogList/blogList";
import { useLocation, useNavigate } from "react-router-dom";
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
  "refused",
];

const postsPerPage = 12;

const DashboardBody = ({ user, type }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [group, setGroup] = useState([]);
  const [allGroup, setAllGroup] = useState([]);

  const [userProfileInfo, setUserProfileInfo] = useState([]);

  const [groupInfo, setGroupInfo] = useState({});

  const [blogPosts, setBlogPosts] = useState([]);
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [publishedIndex, setPublishedIndex] = useState(0);

  const [addTeam, setAddTeam] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  const fetchBlogPosts = async () => {
    const url = `${API_URL}posts/`;

    const token = localStorage.getItem("access_token");

    const headers = {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    };

    const response = await axios.get(url, { headers });

    const sortData = response.data.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    setBlogPosts(sortData);

    setPublishedPosts(sortData.filter((post) => post.status === postStatus[2]));
  };

  useEffect(() => {
    fetchBlogPosts();
  }, [type]);

  const { handleError } = useErrorContext();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (type === "admin") {
      axios
        .post(
          `${API_URL}groups/groupping`,
          {},
          {
            headers,
          }
        )
        .then((response) => setGroup(response.data))
        .catch((error) => handleError(error));

      axios
        .get(`${API_URL}groups/`, {
          headers,
        })
        .then((response) => setAllGroup(response.data))
        .catch((error) => handleError(error));
    } else if (type === "leader") {
      axios
        .get(`${API_URL}groups/${user.group_id}`, {
          headers,
        })
        .then((response) => setGroupInfo(response.data))
        .catch((error) => handleError(error));

      axios
        .get(`${API_URL}user/`, {
          headers,
        })
        .then((response) => setGroup(response.data))
        .catch((error) => handleError(error));
    }
  }, [type]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    axios
      .get(`${API_URL}user/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setUserProfileInfo(response.data);
      });
  }, [type]);

  const handleSearch = (e) => {
    setPublishedIndex(0);

    const searchTerm = e.target.value.toLowerCase();
    const filteredPosts = blogPosts.filter(
      (post) => post.status === postStatus[2]
    );

    setPublishedPosts(
      filteredPosts.filter((item) =>
        item.title.toLowerCase().includes(searchTerm)
      )
    );
  };

  const handleChangePage = (dir) => {
    setPublishedIndex((prev) => {
      if (dir === "left") {
        if (prev <= 0) return prev;

        return prev - 1;
      } else {
        const nextPrev = prev + 1;

        if (nextPrev >= publishedPosts.length / postsPerPage) return prev;

        return nextPrev;
      }
    });
  };

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
              {Object.entries(group).map(([key, values]) => {
                const matchingGroup = allGroup.find(
                  (groupObj) => groupObj.group_name === key
                );

                if (matchingGroup) {
                  return (
                    <Group
                      user={user}
                      keyLabel={key}
                      key={key}
                      values={values}
                      type={type}
                      groupID={matchingGroup.id}
                      userProfileInfo={userProfileInfo.filter(
                        (item) => item.group_id === matchingGroup.id
                      )}
                    />
                  );
                } else {
                  return (
                    <Group
                      user={user}
                      keyLabel={key}
                      key={key}
                      values={values}
                      type={type}
                      userProfileInfo={userProfileInfo.filter(
                        (item) => item.group_id === null
                      )}
                      groupID={null}
                    />
                  );
                }
              })}
            </div>

            <div className={styles.adminProfile}>
              <UserInfo
                user={user}
                onClick={() => navigate("/dashboard/user")}
              />
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

              <Group values={group} type={type} user={user} />
            </div>

            <div className={styles.adminProfile}>
              <UserInfo
                user={user}
                onClick={() => navigate("/dashboard/user")}
              />
            </div>
          </div>
        )}
        <div className={styles.bodyWrapper}>
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
                        index === 0
                          ? post.status === postStatus[0] ||
                            post.status === postStatus[4]
                          : index === 1
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
              edit={type !== "admin" && type !== "leader"}
              content={blogPosts.filter((post) =>
                type === "admin"
                  ? post.status === postStatus[1]
                  : type === "leader"
                  ? post.status === postStatus[3]
                  : tabIndex === 0
                  ? post.status === postStatus[0] ||
                    post.status === postStatus[4]
                  : tabIndex === 1
                  ? (post.status === postStatus[tabIndex] ||
                      post.status === postStatus[3]) &&
                    post.user_id === user.id
                  : post.status === postStatus[tabIndex] &&
                    post.user_id === user.id
              )}
            />

            {blogPosts.filter((post) => post.status === postStatus[2]).length >
              0 &&
              (type === "admin" || type === "leader") && (
                <>
                  <div className={styles.searchWrapper}>
                    <h2 className={`${styles.adminTitle}`}>
                      Published stories
                    </h2>

                    <input
                      type="text"
                      placeholder="Search..."
                      onChange={handleSearch}
                    />
                  </div>

                  <BlogList
                    edit={true}
                    content={publishedPosts.slice(
                      postsPerPage * publishedIndex,
                      postsPerPage * (publishedIndex + 1)
                    )}
                  />

                  <div className={styles.pagination}>
                    <p>
                      {postsPerPage * publishedIndex + 1} -{" "}
                      {postsPerPage * (publishedIndex + 1) <=
                      publishedPosts.length
                        ? postsPerPage * (publishedIndex + 1)
                        : publishedPosts.length}{" "}
                      of {publishedPosts.length}
                    </p>

                    <div className={styles.arrows}>
                      <svg
                        onClick={() => handleChangePage("left")}
                        viewBox="0 0 7 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.996255 0.754652L6.82894 6.58734C6.88317 6.64151 6.92619 6.70583 6.95554 6.77664C6.98489 6.84745 7 6.92335 7 7C7 7.07665 6.98489 7.15255 6.95554 7.22336C6.92619 7.29416 6.88317 7.35849 6.82894 7.41266L0.996255 13.2453C0.88681 13.3548 0.738371 13.4163 0.583592 13.4163C0.428814 13.4163 0.280375 13.3548 0.17093 13.2453C0.0614851 13.1359 5.11356e-09 12.9875 6.95927e-09 12.8327C8.80499e-09 12.6779 0.0614851 12.5295 0.17093 12.42L5.59168 7L0.17093 1.57998C0.116739 1.52579 0.0737515 1.46145 0.0444232 1.39065C0.0150949 1.31984 1.45153e-07 1.24395 1.46067e-07 1.16731C1.46981e-07 1.09068 0.0150949 1.01479 0.0444232 0.943984C0.0737515 0.873178 0.116739 0.808844 0.17093 0.754652C0.225122 0.70046 0.289457 0.657475 0.360261 0.628146C0.431066 0.598818 0.506954 0.583722 0.583593 0.583722C0.660231 0.583722 0.736119 0.598818 0.806924 0.628146C0.877728 0.657475 0.942063 0.70046 0.996255 0.754652Z"
                          fill="#14213D"
                        />
                      </svg>

                      <svg
                        onClick={() => handleChangePage("right")}
                        viewBox="0 0 7 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.996255 0.754652L6.82894 6.58734C6.88317 6.64151 6.92619 6.70583 6.95554 6.77664C6.98489 6.84745 7 6.92335 7 7C7 7.07665 6.98489 7.15255 6.95554 7.22336C6.92619 7.29416 6.88317 7.35849 6.82894 7.41266L0.996255 13.2453C0.88681 13.3548 0.738371 13.4163 0.583592 13.4163C0.428814 13.4163 0.280375 13.3548 0.17093 13.2453C0.0614851 13.1359 5.11356e-09 12.9875 6.95927e-09 12.8327C8.80499e-09 12.6779 0.0614851 12.5295 0.17093 12.42L5.59168 7L0.17093 1.57998C0.116739 1.52579 0.0737515 1.46145 0.0444232 1.39065C0.0150949 1.31984 1.45153e-07 1.24395 1.46067e-07 1.16731C1.46981e-07 1.09068 0.0150949 1.01479 0.0444232 0.943984C0.0737515 0.873178 0.116739 0.808844 0.17093 0.754652C0.225122 0.70046 0.289457 0.657475 0.360261 0.628146C0.431066 0.598818 0.506954 0.583722 0.583593 0.583722C0.660231 0.583722 0.736119 0.598818 0.806924 0.628146C0.877728 0.657475 0.942063 0.70046 0.996255 0.754652Z"
                          fill="#14213D"
                        />
                      </svg>
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>

      {addTeam && <AddTeamPopup close={() => setAddTeam(false)} />}
    </>
  );
};

export default DashboardBody;

const Group = ({ keyLabel, values, type, groupID, userProfileInfo, user }) => {
  const { handleError } = useErrorContext();
  const [open, setOpen] = useState(false);

  const [createUser, setCreateUser] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem("access_token");

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.delete(`${API_URL}groups/${groupID}`, {
        headers,
      });

      window.location.reload();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <div className={styles.group}>
        {type === "admin" && (
          <div
            className={styles.groupTitle}
            onClick={() => setOpen((prev) => !prev)}
          >
            <div>
              {keyLabel === "without_group" ? "Without group" : keyLabel}
            </div>

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
        {(open || (user.role === "leader" && user.role === type)) && (
          <div className={styles.groupList}>
            <UserItem
              list={values.filter((value) => value.role === "admin")}
              userType={"admin"}
              type={type}
              keyLabel={keyLabel}
              userProfileInfo={userProfileInfo}
            />
            <UserItem
              list={values.filter((value) => value.role === "leader")}
              userType={"leader"}
              type={type}
              keyLabel={keyLabel}
              userProfileInfo={userProfileInfo}
            />
            <UserItem
              list={values.filter((value) => value.role === "publisher")}
              userType={"Researchers"}
              type={type}
              groupID={groupID}
              keyLabel={keyLabel}
              setCreateUser={setCreateUser}
              userProfileInfo={userProfileInfo}
            />
          </div>
        )}
        {open && keyLabel !== "without_group" && (
          <div className={styles.deleteGroupBtn} onClick={handleDelete}>
            Delete Group
          </div>
        )}
      </div>

      {createUser && (
        <CreateUserPopup close={() => setCreateUser(false)} groupID={groupID} />
      )}
    </>
  );
};

const UserItem = ({
  list = [],
  type,
  userType,
  setCreateUser,
  keyLabel,
  userProfileInfo,
}) => {
  return (
    <>
      <div className={styles.userCreateRow}>
        {(list.length > 0 ||
          (userType !== "leader" && userType !== "admin")) && (
          <div className={styles.userLabel}>
            {userType === "admin" ? (
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
                Admin
              </>
            ) : userType === "leader" ? (
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

        {type !== "leader" &&
          keyLabel !== "without_group" &&
          userType !== "leader" &&
          userType !== "admin" && (
            <svg
              onClick={() => setCreateUser(true)}
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.696289" width="16" height="16" rx="3" fill="#ECECEC" />
              <path
                d="M11.9987 9.36312H8.66536V12.6965C8.66536 13.0631 8.36536 13.3631 7.9987 13.3631C7.63203 13.3631 7.33203 13.0631 7.33203 12.6965V9.36312H3.9987C3.63203 9.36312 3.33203 9.06312 3.33203 8.69645C3.33203 8.32979 3.63203 8.02979 3.9987 8.02979H7.33203V4.69645C7.33203 4.32979 7.63203 4.02979 7.9987 4.02979C8.36536 4.02979 8.66536 4.32979 8.66536 4.69645V8.02979H11.9987C12.3654 8.02979 12.6654 8.32979 12.6654 8.69645C12.6654 9.06312 12.3654 9.36312 11.9987 9.36312Z"
                fill="#767676"
              />
            </svg>
          )}
      </div>
      {list.map((value, index) => (
        <User
          key={index}
          value={value}
          userType={userType}
          type={type}
          userProfileInfo={
            userProfileInfo
              ? userProfileInfo.filter((item) => item.id === value.user_id)
              : [value]
          }
        />
      ))}
    </>
  );
};

const User = ({ value, userType, type, userProfileInfo }) => {
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

      const response = await axios.delete(`${API_URL}user/${value.user_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "application/json",
        },
      });

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
        `${API_URL}user/${value.user_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      window.location.reload();
    } catch (error) {
      handleError(error);
    }
  };

  const handlePromoteToAdmin = async (isAdmin) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      const formData = new FormData();
      formData.append("role", isAdmin ? "admin" : "leader");

      const response = await axios.put(
        `${API_URL}user/${value.user_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      window.location.reload();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className={styles.groupUser}>
      <div>
        <div className={styles.avatar}>
          <img
            src={
              userProfileInfo[0]?.profile_image_path
                ? userProfileInfo[0]?.profile_image_path
                : DefaultUser
            }
            alt=""
          />
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
            <div onClick={() => handlePromoteToAdmin(userType !== "admin")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M244,120a52.06,52.06,0,0,0-52-52H152.32c-3.44-.21-52.6-4-99.46-43.3A20,20,0,0,0,20,40V200a19.8,19.8,0,0,0,11.54,18.12,19.86,19.86,0,0,0,21.32-2.81A192.92,192.92,0,0,1,136,174.47v26.2a20,20,0,0,0,8.9,16.64,11.35,11.35,0,0,0,1.39.8l14.44,7.06A20,20,0,0,0,190.37,213l11.09-41.82A52.07,52.07,0,0,0,244,120ZM44,191.63V48.4c36.17,28.07,72.17,38.1,92,41.66V150C116.17,153.52,80.17,163.55,44,191.63ZM168.39,202.2,160,198.1V172h16.4ZM192,148H160V92h32a28,28,0,1,1,0,56Z"></path>
              </svg>
              {userType !== "admin" ? "Make" : "Remove"} a Admin
            </div>
          }
          {userType !== "admin" && (
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
          )}
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

      const response = await axios.post(`${API_URL}groups/`, formData, {
        headers,
      });

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

const CreateUserPopup = ({ close, groupID }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(DefaultImage);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

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

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };
  const handleUserPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleAddGroup = async () => {
    if (loading) return;

    try {
      if (!userName || !userEmail || !userPassword) {
        alert("Please fill in all inputs.");
        return;
      }

      setLoading(true);

      const token = localStorage.getItem("access_token");

      const formData = new FormData();
      const randomFileName = generateRandomString(20);

      formData.append("username", userName);
      formData.append("email", userEmail);
      formData.append("password", userPassword);
      formData.append("role", "publisher");
      formData.append("group_id", groupID);

      if (fileInputRef.current.files[0]) {
        formData.append(
          "profile_photo",
          fileInputRef.current.files[0],
          randomFileName
        );
      }

      const headers = {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post(`${API_URL}user/`, formData, {
        headers,
      });

      setUserName("");
      setUserEmail("");
      setUserPassword("");
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

        <div className={styles.popupLabel}>Create user</div>
        <div className={styles.popupOptionLabel}>User Avatar</div>

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
          <div className={styles.popupOptionLabel}>User name</div>

          <input
            type="text"
            placeholder="Enter user name"
            value={userName}
            onChange={handleUserNameChange}
          />
        </div>
        <div>
          <div className={styles.popupOptionLabel}>User email</div>

          <input
            type="text"
            placeholder="Enter user email"
            value={userEmail}
            onChange={handleUserEmailChange}
          />
        </div>
        <div>
          <div className={styles.popupOptionLabel}>User password</div>

          <input
            type="password"
            placeholder="Enter user password"
            value={userPassword}
            onChange={handleUserPasswordChange}
          />
        </div>

        <div className={styles.popupButton}>
          <Button onClick={handleAddGroup}>Add User</Button>
        </div>
      </div>
    </div>
  );
};
