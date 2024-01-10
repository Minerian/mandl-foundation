import styles from "./logos.module.css";

import { useEffect, useRef } from "react";

const Logos = ({ list = [], title }) => {
  const line1 = useRef();
  const line2 = useRef();

  useEffect(() => {
    setTimeout(() => {
      line1.current.classList.add("move1");
      line2.current.classList.add("move2");
    }, 1000);
  }, []);

  return (
    <>
      <div className="container">
        <p className={styles.title}>{title}</p>
      </div>

      <div className={` ${styles.logos}`}>
        <div className={styles.logoImage}>
          <div className={`${styles.line1} line1`} ref={line1}>
            {list.map((logo, index) => (
              <>
                <img src={logo} alt="" />
              </>
            ))}
          </div>
          <div className={`${styles.line2} line2`} ref={line2}>
            {list.map((logo, index) => (
              <>
                <img src={logo} alt="" />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Logos;

// const Logos = ({ list = [], title }) => {
//   return (
//     <div className={styles.logos}>
//       <div className="container">
//         <p>{title}</p>
//       </div>

//       <div className={`${styles.logosGroupWrapper} container`}>
//         <div className={styles.logosGroup}>
//           {list.map((item) => (
//             <img src={item} />
//           ))}
//         </div>
//         <div className={`${styles.logosGroup} ${styles.logosGroup2}`}>
//           {list.map((item) => (
//             <img src={item} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Logos;
