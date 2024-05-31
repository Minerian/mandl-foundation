import { useState } from "react";
import Logo from "../../../assets/logo.svg";
import Button from "../../../components/button/button";
import Input from "../../../components/input/input";

import styles from "./loginBody.module.css";
import { API_URL } from "../../../const/apiUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginBody = () => {
  const [emailUsername, setEmailUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleEmailUsernameChange = (value) => {
    setEmailUsername(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleLogin = async () => {
    try {
      setIsSubmitting(true);

      const data = {
        grant_type: "password",
        username: emailUsername,
        password: password,
      };

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const response = await axios.post(`${API_URL}login`, data, { headers });

      localStorage.setItem("access_token", response.data.access_token);

      navigate("/dashboard");

      setIsSubmitting(false);

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error", error);

      alert("Your input values don't match. Please try again.");

      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.body}>
      <img src={Logo} alt="" />

      <div className={styles.title}>Login to Meinor</div>
      <p>Log in to your blog account</p>

      <div className={styles.inputs}>
        <Input
          placeholder="Email or username"
          onChange={handleEmailUsernameChange}
          value={emailUsername}
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={handlePasswordChange}
          value={password}
        />
      </div>

      <div
        className={styles.button}
        style={{
          pointerEvents: isSubmitting ? "none" : "initial",
          opacity: isSubmitting ? "0.7" : "1",
        }}
      >
        <Button onClick={handleLogin}>Login</Button>
      </div>

      {/* <div className={styles.textLine}>
        <span>Forgot Password</span>
      </div>
      <div className={styles.textLine}>
        Don’t have an account? <span>Sign up</span>
      </div> */}
    </div>
  );
};

export default LoginBody;
