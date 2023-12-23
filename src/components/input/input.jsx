import { useEffect, useState } from "react";
import styles from "./input.module.css";

const Input = ({ placeholder, type = "text", onChange }) => {
  const [inputType, setInputType] = useState();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputType(type);
  }, [type]);

  const handleClick = () => {
    if (inputType === "text") {
      setInputType("password");
    } else {
      setInputType("text");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={styles.input}>
      <input
        type={inputType}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />

      {type === "password" && (
        <svg
          onClick={handleClick}
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.0013 3.56445C4.66797 3.56445 1.8213 5.63779 0.667969 8.56445C1.8213 11.4911 4.66797 13.5645 8.0013 13.5645C11.3346 13.5645 14.1813 11.4911 15.3346 8.56445C14.1813 5.63779 11.3346 3.56445 8.0013 3.56445ZM8.0013 11.8978C6.1613 11.8978 4.66797 10.4045 4.66797 8.56445C4.66797 6.72445 6.1613 5.23112 8.0013 5.23112C9.8413 5.23112 11.3346 6.72445 11.3346 8.56445C11.3346 10.4045 9.8413 11.8978 8.0013 11.8978ZM8.0013 6.56445C6.89464 6.56445 6.0013 7.45779 6.0013 8.56445C6.0013 9.67112 6.89464 10.5645 8.0013 10.5645C9.10797 10.5645 10.0013 9.67112 10.0013 8.56445C10.0013 7.45779 9.10797 6.56445 8.0013 6.56445Z"
            fill={inputType === "text" ? "#000" : "#767676"}
          />
        </svg>
      )}
    </div>
  );
};

export default Input;
