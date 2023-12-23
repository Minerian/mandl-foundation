import { useEffect, useState } from "react";
import BlogHero from "../sections/blog/blogHero/blogHero";
import BlogList from "../sections/blog/blogList/blogList";
import VerticalCard from "../sections/blog/verticalCard/verticalCard";
import BlogPostBody from "../sections/blog/blogPostBody/blogPostBody";
import { API_URL } from "../const/apiUrl";

import axios from "axios";
import { useLocation } from "react-router-dom";

const BlogPost = () => {
  const [blogPost, setBlogPost] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  const location = useLocation();
  const { pathname } = location;

  const fetchBlogPosts = async () => {
    const url = `${API_URL}posts/`;

    try {
      const response = await axios.get(url);

      setBlogPosts(response.data.slice(0, 8));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchBlogPost = async () => {
    try {
      const slug = pathname.split("/").pop();

      const response = await axios.get(`${API_URL}posts/html/${slug}`);
      console.log(response.data, "aaa");

      setBlogPost(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchBlogPosts();

    fetchBlogPost();
  }, []);

  return (
    <section>
      <BlogPostBody post={blogPost} />

      <h2>Related articles</h2>
      <BlogList content={blogPosts} />

      <br />
      <br />
    </section>
  );
};

export default BlogPost;
