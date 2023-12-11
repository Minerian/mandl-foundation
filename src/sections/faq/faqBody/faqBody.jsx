import { useState } from "react";
import styles from "./faqBody.module.css";

const general = [
  {
    question: "What is Maindl Foundation?",
    answer:
      "Maindl Foundation, a non-profit organization, is devoted to transforming lives globally through healthcare, education, and humanitarian aid. By focusing on critical health issues, providing educational opportunities, and offering support in times of crisis, the foundation strives to create a lasting impact and contribute to positive change across communities and borders.",
  },
  {
    question: "What is the story of Maindl Foundation?",
    answer:
      "The story of Maindl Foundation is one rooted in compassion, dedication, and a fervent desire to make a positive impact on a global scale. Founded with a vision to transform lives through healthcare, education, and humanitarian aid, the foundation's journey began with the recognition of the profound challenges faced by individuals and communities worldwide. Driven by a sense of responsibility and a commitment to address pressing issues, Maindl Foundation emerged as a non-profit organization dedicated to bringing about meaningful change. The founders, inspired by the belief that everyone deserves access to healthcare, quality education, and support in times of crisis, set out to create an organization that would serve as a beacon of hope and empowerment. Throughout its evolution, Maindl Foundation has forged partnerships, implemented impactful programs, and responded to crises with resilience and determination. The foundation's initiatives range from supporting healthcare infrastructure and providing educational opportunities to delivering humanitarian aid in times of need. The story of Maindl Foundation is one of growth, collaboration, and a relentless pursuit of a better world. It is shaped by the collective efforts of individuals who share a common goal: to contribute to the well-being of humanity. As the foundation continues to make strides in its mission, the narrative unfolds with each life touched, each community uplifted, and each challenge met with unwavering resolve. It is a story that invites others to join in the journey, as together, we strive to create a more compassionate, equitable, and sustainable future for all.",
  },
  {
    question: "How can I contact Maindl Foundation?",
    answer:
      "Feel free to connect with us either by visiting our contact page on the website or reaching out to us directly at contact@maindl.org. We look forward to hearing from you and addressing any inquiries or feedback you may have.",
  },
];

const donation = [
  {
    question: "How can I make a donation to Maindl Foundation?",
    answer:
      "We focus on impactful collaborations with businesses and higher-value donations. While we don't currently have an online donation process, we prioritize partnerships to maximize our collective impact. Explore how your company's values align with ours. Let's work together to make a real difference through strategic alliances and corporate social responsibility. Have questions or want to discuss partnership opportunities? Reach out to us at contact@maindl.org.",
  },
  {
    question: "Is my donation tax-deductible?",
    answer:
      "Donations made to Maindl Foundation are tax-deductible in several countries, including the United States, Germany, Canada, the Netherlands, France, South Korea, and certain regions of Australia. Your support makes a meaningful impact, and we appreciate your contribution to our mission. You can reach out to us for partnership inquiries at partner@maindl.org.",
  },
];

const impact = [
  {
    question: "How does Maindl Foundation measure its impact?",
    answer:
      "Stay informed about our ongoing impact and success stories by regularly checking our website. Dive into detailed information available on our 'About Us' page and explore the latest findings in our research section. We're dedicated to keeping you updated on the transformative journey we're embarking on, showcasing the tangible results of our efforts.",
  },
  {
    question: "Is Maindl Foundation transparent about its financials?",
    answer:
      "Yes, Maindl Foundation is committed to transparency in its financial operations. The foundation understands the importance of accountability and provides detailed information about its financials. You can access financial reports, statements, and other relevant information on our website or by contacting us directly. We believe in open communication and aim to foster trust with our stakeholders by being transparent about how funds are utilized to support our mission. If you have specific inquiries or would like more information, feel free to reach out to us.",
  },
];

const involved = [
  {
    question: "Can I volunteer for Maindl Foundation?",
    answer:
      "Absolutely! We appreciate your interest in volunteering with Maindl Foundation. To get started, please visit our main page and choose the 'Become a Volunteer' option. There, you'll find detailed information on how to join us in making a positive impact through volunteering. We look forward to having you on board.",
  },
  {
    question:
      "Are there opportunities for partnerships with Maindl Foundation?",
    answer:
      "Yes, we actively seek meaningful collaborations! To kickstart the process, simply visit our main page and choose the 'Become a Partner' option. We invite you to explore the possibilities and join us in making a lasting impact through partnership.",
  },
];

const program = [
  {
    question: "What specific healthcare programs does Maindl Foundation offer?",
    answer:
      "For detailed information on our healthcare programs, we invite you to visit our dedicated 'Medicine' section. There, you'll find comprehensive insights into the specific initiatives, projects, and impact stories related to healthcare that Maindl Foundation is actively involved in. Our Medicine Page is regularly updated to keep our supporters informed about the progress and outcomes of our healthcare programs. Feel free to delve into the articles to discover the meaningful contributions we're making to improve healthcare access and outcomes in various communities.",
  },
  {
    question:
      "Can my school/community apply for Maindl Foundation's education initiatives?",
    answer:
      "Absolutely! We encourage schools and communities interested in applying for Maindl Foundation's education initiatives to get in touch with us. Please reach out via email to andriana@maindl.org, and our team will guide you through the application process and provide the necessary details to explore potential collaborations. We look forward to hearing from you and working together to enhance educational opportunities in your school or community.",
  },
  {
    question:
      "Are there ongoing projects related to humanitarian aid, and how can I stay updated?",
    answer:
      "Yes, Maindl Foundation is actively involved in ongoing humanitarian aid projects. Stay informed about the latest developments and impact by regularly checking the dedicated 'Aid' section on our website. We invite you to explore the Aid section for detailed insights into our current initiatives, progress reports, and stories of positive change resulting from our humanitarian efforts.",
  },
];

const FaqBody = () => {
  return (
    <section className={styles.section}>
      <h2>Frequently Asked Question's</h2>

      <h3>General Information</h3>

      <div className={styles.itemGroup}>
        {general.map((item) => (
          <FaqItem data={item} />
        ))}
      </div>

      <h3>Donations and Support</h3>

      <div className={styles.itemGroup}>
        {donation.map((item) => (
          <FaqItem data={item} />
        ))}
      </div>

      <h3>Impact and Transparency</h3>

      <div className={styles.itemGroup}>
        {impact.map((item) => (
          <FaqItem data={item} />
        ))}
      </div>

      <h3>Get Involved</h3>

      <div className={styles.itemGroup}>
        {involved.map((item) => (
          <FaqItem data={item} />
        ))}
      </div>

      <h3>Programs and Initiatives</h3>

      <div className={styles.itemGroup}>
        {program.map((item) => (
          <FaqItem data={item} />
        ))}
      </div>
    </section>
  );
};

export default FaqBody;

const FaqItem = ({ data }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={styles.faqItem}
      onClick={() => {
        setShow((prev) => !prev);
      }}
    >
      <div className={styles.question}>
        <div>{data.question}</div>
        <svg
          style={{ transform: show ? "rotate(45deg)" : "rotate(0deg)" }}
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 13.5752H13V19.5752H11V13.5752H5V11.5752H11V5.5752H13V11.5752H19V13.5752Z"
            fill="#1A1A1A"
          />
        </svg>
      </div>

      {show && <p>{data.answer}</p>}
    </div>
  );
};
