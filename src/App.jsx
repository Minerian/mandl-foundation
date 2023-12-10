import Navigation from "./components/navigation/navigation";
import NavigationMob from "./components/navigation/navigationMob";
import Home from "./screens/home";
import "./styles/general.css";

function App() {
  return (
    <>
      <Navigation />
      <NavigationMob />

      <Home />
    </>
  );
}

export default App;
