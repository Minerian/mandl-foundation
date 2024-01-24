import { useEffect, useState } from "react";
import BlogHero from "../sections/blog/blogHero/blogHero";
import BlogList from "../sections/blog/blogList/blogList";
import VerticalCard from "../sections/blog/verticalCard/verticalCard";
import BlogPostBody from "../sections/blog/blogPostBody/blogPostBody";
import { API_URL } from "../const/apiUrl";

import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import ReviewBody from "../sections/dashboard/reviewBody/reviewBody";

const ReviewPost = () => {
  const { post } = useParams();
  const [blogPost, setBlogPost] = useState([]);

  const location = useLocation();
  const { pathname } = location;

  const fetchBlogPost = async () => {
    try {
      const slug = pathname.split("/").pop();

      const response = await axios.get(`${API_URL}posts/html/${slug}`);

      setBlogPost(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchBlogPost();
  }, [post]);

  return (
    <section>
      <ReviewBody post={blogPost} />
    </section>
  );
};

export default ReviewPost;
