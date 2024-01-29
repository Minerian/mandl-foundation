import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../const/apiUrl";
import { useErrorContext } from "../layout/dashLayout";
import DashboardHeader from "../sections/dashboard/dashboardHeader/dashboardHeader";
import DashboardBody from "../sections/dashboard/dashboardBody/dashboardBody";

const Dashboard = ({ layout }) => {
  const { handleError } = useErrorContext();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

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

        setLoading(true);
      })
      .catch((error) => handleError(error));
  }, []);

  return (
    <>
      {loading && (
        <div className="dashboard-body">
          <DashboardHeader user={user} type={layout} />
          <DashboardBody user={user} type={layout} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
