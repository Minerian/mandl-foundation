import Navigation from "../components/navigation/navigation";
import NavigationMob from "../components/navigation/navigationMob";
import Footer from "../sections/footer/footer";

const FrontLayout = ({ children }) => {
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
