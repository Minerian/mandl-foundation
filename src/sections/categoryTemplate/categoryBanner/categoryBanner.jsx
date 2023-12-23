import styles from "./categoryBanner.module.css";

const CategoryBanner = ({ type }) => {
  return (
    <div className={styles.section}>
      <div className="container">
        {type === "medicine"
          ? `Improved health is a basic right, not a privilege. The goal is to make
        healthcare essential for everyone, shaping a society where well-being is
        a shared reality and driving positive changes at all levels.`
          : type === "education"
          ? `These components are the key to empowering minds and catalyzing societal transformation. Emphasizing the cultivation of critical thinking, problem-solving skills, and the practical application of knowledge, individuals are equipped not only with academic prowess but also with the tools to navigate real-world challenges.`
          : `These components are indispensable as it allows rapid response to crises, providing immediate support in the event of natural disasters, conflicts and displacement. The commitment involves addressing urgent needs, from basic supplies to shelter, alleviating the burden faced by affected communities.`}
      </div>
    </div>
  );
};

export default CategoryBanner;
