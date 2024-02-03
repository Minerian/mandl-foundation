import { useEffect } from "react";
import Navigation from "../components/navigation/navigation";
import NavigationMob from "../components/navigation/navigationMob";
import Footer from "../sections/footer/footer";
import { useLocation } from "react-router-dom";

const FrontLayout = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <Navigation />
      <NavigationMob />

      {children}

      <Footer />
    </div>
  );
};

export default FrontLayout;
