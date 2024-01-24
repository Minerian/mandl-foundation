import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../const/apiUrl";
import { useErrorContext } from "../layout/dashLayout";
import DashboardHeader from "../sections/dashboard/dashboardHeader/dashboardHeader";
import DashboardBody from "../sections/dashboard/dashboardBody/dashboardBody";

const Dashboard = () => {
  const { handleError } = useErrorContext();

  const [user, setUser] = useState({});
  const [type, setType] = useState(false);

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
          setType("admin");
        } else if (response.data.role === "leader") {
          setType("leader");
        } else {
          setType("user");
        }
      })
      .catch((error) => handleError(error));
  }, []);

  return (
    <>
      {type && (
        <div className="dashboard-body">
          <DashboardHeader user={user} type={type} setType={setType} />
          <DashboardBody user={user} type={type} setType={setType} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
