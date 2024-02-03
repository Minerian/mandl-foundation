import styles from "./categoryWhy.module.css";

const content = {
  medicine: [
    {
      title: "Medical Outreach Programs",
      desc: "We believe in reaching the unreached. Our medical outreach programs are designed to extend healthcare services to underserved communities. By organizing mobile clinics and health camps, we bring vital medical care directly to those who need it most, ensuring that geographical barriers never become barriers to health.",
    },
    {
      title: "Health Education Campaigns",
      desc: "Education is empowerment. Through targeted health education campaigns, we strive to raise awareness about preventive healthcare measures, hygiene practices, and disease management. By imparting knowledge, we empower individuals to take charge of their health, fostering healthier and more resilient communities.",
    },
    {
      title: "Medical Equipment Provision",
      desc: "Access to proper medical equipment is fundamental to quality healthcare. Maindl Foundation is committed to providing essential medical equipment to healthcare facilities in need. Whether it's diagnostic tools, life-saving devices, or infrastructure support, we aim to bridge gaps and enhance the capabilities of medical institutions, enabling them to deliver superior care.",
    },
    {
      title: "Telemedicine Services",
      desc: "Embracing innovation, we understand the transformative potential of telemedicine. Through cutting-edge technology, we connect healthcare professionals with remote communities. Our telemedicine services facilitate virtual consultations, medical advice, and follow-ups, ensuring that individuals in remote areas can access timely and expert medical guidance.",
    },
  ],
  education: [
    {
      title: "Scholarship Programs",
      desc: "We are committed to fostering a generation of leaders by providing access to education through our scholarship programs. By removing financial barriers, we empower deserving individuals to pursue their academic aspirations, unlocking a world of opportunities and creating a ripple effect of positive change.",
    },
    {
      title: "Infrastructure Development",
      desc: "The integration of artificial intelligence (AI) into medical practices is streamlining diagnostics and enhancing treatment planning. AI algorithms analyze vast datasets to identify patterns and provide insights into disease prediction, allowing for earlier intervention and personalized treatment plans.",
    },
    {
      title: "Digital Literacy Initiatives",
      desc: "In today's digital age, we understand the significance of digital literacy in shaping the future. Our initiatives focus on equipping students with the skills needed to thrive in the digital landscape, bridging the gap and ensuring that no one is left behind in the rapidly evolving world of technology.",
    },
    {
      title: "Teacher Training Programs",
      desc: "We recognize that teachers play a pivotal role in shaping the educational experience. Our training programs aim to empower educators with the tools, knowledge, and skills necessary to provide quality education. By investing in teachers, we contribute to the overall enhancement of the educational ecosystem.",
    },
  ],
  aid: [
    {
      title: "Emergency Relief",
      desc: "Humanitarian aid is crucial during emergencies. Our commitment involves rapid responses to natural disasters, conflicts, and crises, ensuring that affected communities receive immediate support. From providing essential supplies to offering shelter, our goal is to ease the burden on those facing urgent needs.",
    },
    {
      title: "Empowering Refugees",
      desc: "In the face of displacement, we extend our humanitarian aid to empower refugees. Through initiatives focusing on shelter, healthcare, and skill development, we aim to provide comprehensive support.",
    },
    {
      title: "Nutrition Programs",
      desc: "Malnutrition is a pervasive challenge, particularly in vulnerable populations. We address this issue through targeted nutrition programs, ensuring that children and families receive the nourishment they need to thrive. Our efforts aim not only to combat hunger but also to build resilience for a healthier future.",
    },
    {
      title: "Psycho-social Support",
      desc: "Recognizing the impact of crises on mental health, we actively engage in providing psycho-social support. Our initiatives focus on counseling services, community support networks, and mental health awareness to help individuals cope with trauma and rebuild their lives with resilience.",
    },
  ],
};

const CategoryWhy = ({ type }) => {
  return (
    <div className="container">
      <h2>
        Why{" "}
        {type === "medicine"
          ? "medicine"
          : type === "education"
          ? "education"
          : "humanitarian aid"}
        ?
      </h2>

      <div className={styles.content}>
        {content[type].map((item) => (
          <div className={styles.item}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.desc}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryWhy;
