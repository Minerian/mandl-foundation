import BlogHero from "../sections/blog/blogHero/blogHero";
import BlogList from "../sections/blog/blogList/blogList";
import VerticalCard from "../sections/blog/verticalCard/verticalCard";

const Blog = () => {
  return (
    <section>
      <BlogHero />
      <VerticalCard />
      <BlogList />
      <VerticalCard />

      <br />
      <br />
    </section>
  );
};

export default Blog;
