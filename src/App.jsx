import {
  Route,
  Routes, // Change from createRoutesFromElements to Routes
  BrowserRouter as Router, // Use BrowserRouter instead of createBrowserRouter
} from "react-router-dom";
import About from "./screens/about";
import Home from "./screens/home";
import "./styles/general.css";
import FrontLayout from "./layout/frontLayout";
import Faq from "./screens/faq";
import Blog from "./screens/blog";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <FrontLayout>
              <Home />
            </FrontLayout>
          }
        />
        <Route
          path="about"
          element={
            <FrontLayout>
              <About />
            </FrontLayout>
          }
        />
        <Route
          path="faq"
          element={
            <FrontLayout>
              <Faq />
            </FrontLayout>
          }
        />
        <Route
          path="blog"
          element={
            <FrontLayout>
              <Blog />
            </FrontLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
