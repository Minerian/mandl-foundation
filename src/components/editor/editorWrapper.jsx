import React, { useEffect, useState } from "react";
import edjsHTML from "editorjs-html";
import Editor, { generateRandomString, getFileExtension } from "./editor";
import Edit from "../../assets/images/edit.svg";

import styles from "./editor.module.css";
import axios from "axios";
import { API_URL } from "../../const/apiUrl";

import DefaultImage from "../../assets/images/defaultImage.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useErrorContext } from "../../layout/dashLayout";

export function removeSymbol(string) {
  let res = string.replace(/[^\w\s]/gi, " ");

  return res;
}

// Initial Data
const INITIAL_DATA = {
  time: new Date().getTime(),
};

const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};

function EditorWrapper({ html = false }) {
  const [data, setData] = useState(INITIAL_DATA);
  const [popup, setPopup] = useState(false);

  const [wait, setWait] = useState(false);

  const navigate = useNavigate();
  const { handleError } = useErrorContext();

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorCover, setErrorCover] = useState(false);

  const [title, setTitle] = useState();
  const [activeTag, setActiveTag] = useState(0);
  const [coverImage, setCoverImage] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const slug = queryParams.get("slug");
    if (slug) {
      const fetchData = async () => {
        try {
          const responseInfo = await axios.get(`${API_URL}posts/post/${slug}`);

          setTitle(responseInfo.data.title);

          setCoverImage(responseInfo.data.cover_photo_path);
          setActiveTag(tags.indexOf(responseInfo.data.category));
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();
    }
  }, []);

  const handleSave = (title = "", category, cover) => {
    if (wait) return;

    const slug = queryParams.get("slug");

    const edjsParser = edjsHTML();

    const htmlContent = edjsParser.parse(data).join("");
    console.log(title);

    if (title.length === 0) {
      return setErrorTitle(true);
    }

    if (!cover) {
      return setErrorCover(true);
    }

    const parser = new DOMParser();

    const doc = parser.parseFromString(htmlContent, "text/html");

    const htmlArray = Array.from(doc.body.children).map(
      (element) => element.innerText
    );

    const description = htmlArray.join(" ").slice(0, 120) + "...";

    const formData = new FormData();
    formData.append("title", title);

    const postSlug = removeSymbol(title).split(" ").join("-");

    formData.append("slug", postSlug);

    if (slug) {
      formData.append("post_slug", slug);
    }

    formData.append("category", category);
    formData.append("description", description);
    formData.append("html_content", htmlContent);

    if (cover && cover.includes("data:")) {
      const coverBlob = dataURItoBlob(cover);

      const extension = getFileExtension(cover) || ".jpg";

      const randomString = generateRandomString(20);
      const fileName = `${randomString}.${extension}`;
      formData.append("cover_photo", coverBlob, fileName);
    }

    const token = localStorage.getItem("access_token");

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    };

    const setPost = async () => {
      setWait(true);

      const url = `${API_URL}posts/${slug ? "update" : "draft"}_html`;

      try {
        const response = await axios({
          method: slug ? "put" : "post",
          url: url,
          data: formData,
          headers: headers,
        });

        const postSlug = response.data.slug;
        console.log(postSlug);

        await axios.put(`${API_URL}posts/publish`, `slug=${postSlug}`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        navigate("/dashboard");
      } catch (error) {
        handleError(error);

        setWait(false);
      }
    };

    setPost();
  };

  const handleConfirm = () => {
    if (data.blocks?.length > 0) {
      setPopup(true);
    } else {
      alert("You need to fill the text editor with content.");
    }
  };

  const handleDraft = () => {
    if (data.blocks?.length > 0) {
      const slug = queryParams.get("slug");

      const edjsParser = edjsHTML();

      const htmlContent = edjsParser.parse(data).join("");

      const parser = new DOMParser();

      const doc = parser.parseFromString(htmlContent, "text/html");

      const htmlArray = Array.from(doc.body.children).map(
        (element) => element.innerText
      );

      const description = htmlArray.join(" ").slice(0, 120) + "...";

      const formData = new FormData();
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US");
      const formattedTime = currentDate.toLocaleTimeString("en-US", {
        hour12: false,
      });

      let postTitle =
        title?.length > 0
          ? title
          : `Draft Post ${formattedDate} ${formattedTime}`;

      formData.append("title", postTitle);

      const postSlug = removeSymbol(postTitle).split(" ").join("-");

      formData.append("slug", postSlug);

      if (slug) {
        formData.append("post_slug", slug);
      }

      formData.append("category", tags[activeTag]);
      formData.append("description", description);
      formData.append("html_content", htmlContent);

      if (coverImage && coverImage.includes("data:")) {
        const coverBlob = dataURItoBlob(coverImage);
        formData.append("cover_photo", coverBlob, generateRandomString(20));
      }

      const token = localStorage.getItem("access_token");

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      };

      const setPost = async () => {
        const url = `${API_URL}posts/${slug ? "update" : "draft"}_html`;

        try {
          const response = await axios({
            method: slug ? "put" : "post",
            url: url,
            data: formData,
            headers: headers,
          });

          navigate("/dashboard");
        } catch (error) {
          handleError(error);
        }
      };

      setPost();
    } else {
      navigate("/dashboard");
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
      <div className={`editor ${styles.editor}`}>
        <Editor
          data={data}
          onChange={setData}
          editorblock="editorjs-container"
          html={html}
        />
      </div>

      {popup && (
        <EditorPopup
          setPopup={setPopup}
          handleSave={handleSave}
          errorTitle={errorTitle}
          errorCover={errorCover}
          title={title}
          setTitle={setTitle}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
          coverImage={coverImage}
          setCoverImage={setCoverImage}
        />
      )}
    </div>
  );
}

export default EditorWrapper;

const tags = ["Medicine", "Education", "Humanitarian aid"];

const EditorPopup = ({
  setPopup,
  handleSave,
  errorTitle,
  errorCover,
  title,
  setTitle,
  activeTag,
  setActiveTag,
  coverImage,
  setCoverImage,
}) => {
  const handleCoverChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCoverImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    handleSave(title, tags[activeTag], coverImage);
  };

  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <div>New article publishing</div>
          <svg
            onClick={() => setPopup(false)}
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 2.10629L12.59 0.696289L7 6.28629L1.41 0.696289L0 2.10629L5.59 7.69629L0 13.2863L1.41 14.6963L7 9.10629L12.59 14.6963L14 13.2863L8.41 7.69629L14 2.10629Z"
              fill="black"
            />
          </svg>
        </div>

        <div className={styles.coverBody}>
          <div className={styles.cover}>
            <div>Cover of the article</div>
            <div
              className={styles.coverImage}
              style={{
                backgroundImage: `url(${coverImage})`,
                border: errorCover ? "2px solid red" : "2px solid transparent",
              }}
            ></div>
            <div className={styles.coverButton}>
              <label htmlFor="coverInput">
                <img src={Edit} alt="" />
                <p>Edit cover</p>
              </label>
              <input
                type="file"
                id="coverInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleCoverChange}
              />
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>Article title</div>

              <input
                type="text"
                placeholder="Write title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ borderColor: errorTitle ? "red" : "" }}
              />
            </div>
            <div className={styles.infoBox}>
              <div className={styles.infoLabel}>Article tag</div>

              <div className={styles.tagBoxes}>
                {tags.map((item, index) => (
                  <div
                    key={index}
                    className={styles.tagBox}
                    style={{
                      borderColor: activeTag === index ? "#88ACB2" : "",
                    }}
                    onClick={() => setActiveTag(index)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.publishBox}>
              <div className={styles.publishButton} onClick={handlePublish}>
                Publish
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
