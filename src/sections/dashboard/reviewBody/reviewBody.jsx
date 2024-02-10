import { useErrorContext } from "../../../layout/dashLayout";
import styles from "./reviewBody.module.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../const/apiUrl";

const ReviewBody = ({ post }) => {
  const navigate = useNavigate();

  const { handleError } = useErrorContext();

  const location = useLocation();
  const { pathname } = location;

  const handleDraft = () => {
    navigate("/dashboard");
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem("access_token");

    const slug = pathname.split("/").pop();

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const data = {
      slug: slug,
    };

    try {
      const response = await axios.put(`${API_URL}posts/publish`, data, {
        headers,
      });

      navigate("/dashboard/");
    } catch (error) {
      handleError(error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("access_token");

    const slug = pathname.split("/").pop();

    try {
      const response = await axios.put(
        `${API_URL}posts/refuse`,
        {
          slug: slug,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response);

      navigate("/dashboard");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className={styles.editorWrapper}>
      <div className={styles.header}>
        <div onClick={handleDraft}>
          <svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.70492 2.10629L6.29492 0.696289L0.294922 6.69629L6.29492 12.6963L7.70492 11.2863L3.12492 6.69629L7.70492 2.10629Z"
              fill="black"
            />
          </svg>
          Back to dashboard
        </div>
        <div className={styles.buttons}>
          <div onClick={handleDelete}>Refuse</div>
          <div className={styles.confirm} onClick={handleConfirm}>
            Confirm{" "}
            <svg
              width="14"
              height="11"
              viewBox="0 0 14 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.60039 8.62126L1.45039 5.47126L0.400391 6.52126L4.60039 10.7213L13.6004 1.72126L12.5504 0.671265L4.60039 8.62126Z"
                fill="#F9F9F9"
              />
            </svg>
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post }} />
    </div>
  );
};

export default ReviewBody;
