import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorContext = createContext();

export const useErrorContext = () => useContext(ErrorContext);

const DashLayout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");

    if (!access_token) navigate("/login");
  }, []);

  const handleError = (error) => {
    const code = error?.response?.status;

    if (code === 401) {
      localStorage.removeItem("access_token");
      navigate("/login");
    } else if (error?.response?.data?.detail) {
      alert(error.response.data.detail);
    } else {
      console.log(error);
    }
  };

  return (
    <ErrorContext.Provider value={{ handleError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default DashLayout;
