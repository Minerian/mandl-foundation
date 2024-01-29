import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";

import React, { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { API_URL } from "../../const/apiUrl";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const generateRandomString = (length) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

export const getFileExtension = (dataURI) => {
  const match = dataURI.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9]+).*,/);
  if (match && match[1]) {
    return match[1].split("/")[1];
  }
  return null;
};

const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: false,

    config: {
      placeholder: "Tell your story...",
    },
  },

  list: List,
  header: {
    class: Header,
    config: {
      levels: [1, 2, 3],
    },
  },
  image: {
    class: ImageTool,
    config: {
      // endpoints: {
      //   byFile: `${API_URL}posts/upload_images`, // Your backend file uploader endpoint
      //   byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
      // },
      uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
        uploadByFile(file) {
          const formData = new FormData();
          const randomFileName = generateRandomString(20);

          const fileNameParts = file.name.split(".");
          const fileExtension = fileNameParts.pop();

          const newFileName = `${randomFileName}.${fileExtension}`;

          const newFile = new File([file], newFileName, { type: file.type });

          formData.append("image_file", newFile);

          return fetch(`${API_URL}posts/upload_images`, {
            method: "POST",
            body: formData,
            headers: {
              Authorization: document.authorizationHeader,
            },
          })
            .then((r) => r.json())
            .then((data) => {
              return {
                success: 1,
                file: {
                  url: data.uploaded_paths,
                },
              };
            })
            .catch((err) => {
              return {
                success: 0,
              };
            });
        },

        uploadByUrl(url) {
          return new Promise((res, rej) => {
            res({
              success: 1,
              file: {
                url,
              },
            });
          });
        },
      },
    },
  },
};

const Editor = ({ data, onChange, editorblock, html }) => {
  const ref = useRef();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const tokenLocal = localStorage.getItem("access_token");

    document.authorizationHeader = "Bearer " + tokenLocal;
  }, []);

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorblock,
        placeholder: "Tell your story",

        tools: EDITOR_JS_TOOLS,
        data: data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
      ref.current = editor;

      const slug = queryParams.get("slug");

      if (slug) {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${API_URL}posts/html/${slug}`);
            const html = response.data;

            editor.isReady.then(() => {
              editor.blocks.renderFromHTML(html);
            });
          } catch (error) {
            console.error("Error:", error);
          }
        };

        fetchData();
      }
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={editorblock} />;
};

export default memo(Editor);
