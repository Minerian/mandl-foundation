import BlogCard from "../../../components/blogCard/blogCard";
import styles from "./blogList.module.css";

const content = [
  {
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=3008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Medicine",
    title: "How to make an email without a phone number in 2023",
    description:
      "Wondering how to make an email without a phone number? Check out our guide to learn the best method and safeguard your sensitive data.",
    author: "Mykola Kyslychenko",
    authorImage:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Oct 17, 2023",
  },
  {
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=3008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Medicine",
    title: "How to make an email without a phone number in 2023",
    description:
      "Wondering how to make an email without a phone number? Check out our guide to learn the best method and safeguard your sensitive data.",
    author: "Mykola Kyslychenko",
    authorImage:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Oct 17, 2023",
  },
  {
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=3008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Medicine",
    title: "How to make an email without a phone number in 2023",
    description:
      "Wondering how to make an email without a phone number? Check out our guide to learn the best method and safeguard your sensitive data.",
    author: "Mykola Kyslychenko",
    authorImage:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Oct 17, 2023",
  },
  {
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=3008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Medicine",
    title: "How to make an email without a phone number in 2023",
    description:
      "Wondering how to make an email without a phone number? Check out our guide to learn the best method and safeguard your sensitive data.",
    author: "Mykola Kyslychenko",
    authorImage:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Oct 17, 2023",
  },

  {
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=3008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Medicine",
    title: "How to make an email without a phone number in 2023",
    description:
      "Wondering how to make an email without a phone number? Check out our guide to learn the best method and safeguard your sensitive data.",
    author: "Mykola Kyslychenko",
    authorImage:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Oct 17, 2023",
  },
  {
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=3008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Medicine",
    title: "How to make an email without a phone number in 2023",
    description:
      "Wondering how to make an email without a phone number? Check out our guide to learn the best method and safeguard your sensitive data.",
    author: "Mykola Kyslychenko",
    authorImage:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Oct 17, 2023",
  },
  {
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=3008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Medicine",
    title: "How to make an email without a phone number in 2023",
    description:
      "Wondering how to make an email without a phone number? Check out our guide to learn the best method and safeguard your sensitive data.",
    author: "Mykola Kyslychenko",
    authorImage:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Oct 17, 2023",
  },
  {
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=3008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Medicine",
    title: "How to make an email without a phone number in 2023",
    description:
      "Wondering how to make an email without a phone number? Check out our guide to learn the best method and safeguard your sensitive data.",
    author: "Mykola Kyslychenko",
    authorImage:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Oct 17, 2023",
  },
];

const BlogList = () => {
  return (
    <div className={styles.blogSlider}>
      {content.map((item) => (
        <BlogCard item={item} />
      ))}
    </div>
  );
};

export default BlogList;
