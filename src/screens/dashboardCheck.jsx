import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../const/apiUrl";
import { useErrorContext } from "../layout/dashLayout";
import DashboardHeader from "../sections/dashboard/dashboardHeader/dashboardHeader";
import DashboardBody from "../sections/dashboard/dashboardBody/dashboardBody";

const DashboardCheck = ({ layout }) => {
  const { handleError } = useErrorContext();

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${API_URL}user/me`, { headers: headers })
      .then((response) => {
        setUser(response.data);

        if (response.data.role === "admin") {
          navigate("/dashboard/admin");
        } else if (response.data.role === "leader") {
          navigate("/dashboard/leader");
        } else {
          navigate("/dashboard/user");
        }

        setLoading(true);
      })
      .catch((error) => handleError(error));
  }, []);

  return <></>;
};

export default DashboardCheck;
