import { useEffect, useState } from "react";
import BlogHero from "../sections/blog/blogHero/blogHero";
import BlogList from "../sections/blog/blogList/blogList";
import VerticalCard from "../sections/blog/verticalCard/verticalCard";
import axios from "axios";
import { API_URL } from "../const/apiUrl";

import { useLocation } from "react-router-dom";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 500);

  const { state } = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchBlogPosts = async (category) => {
    const url =
      category !== "Medicine" &&
      category !== "Humanitarian aid" &&
      category !== "Education"
        ? `${API_URL}posts/`
        : `${API_URL}posts/?category=${category}`;

    try {
      const response = await axios.get(url);

      setBlogPosts(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchBlogPosts(state?.type);
  }, []);

  return (
    <section>
      <BlogHero fetch={fetchBlogPosts} type={state?.type} />
      {blogPosts.length > 0 && <VerticalCard post={blogPosts[0]} />}

      {isWideScreen ? (
        <BlogList content={blogPosts.slice(1, -1)} />
      ) : (
        <BlogList content={blogPosts} />
      )}

      {blogPosts.length > 1 && (
        <VerticalCard post={blogPosts[blogPosts.length - 1]} />
      )}

      <br />
      <br />
    </section>
  );
};

export default Blog;
