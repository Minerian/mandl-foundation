import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import About from "./screens/about";
import Home from "./screens/home";
import "./styles/general.css";
import FrontLayout from "./layout/frontLayout";
import Faq from "./screens/faq";
import Blog from "./screens/blog";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/mandl_frontend/">
      <Route
        index
        element={
          <FrontLayout>
            <Home />
          </FrontLayout>
        }
      />
      <Route
        path="/mandl_frontend/about"
        element={
          <FrontLayout>
            <About />
          </FrontLayout>
        }
      />
      <Route
        path="/mandl_frontend/faq"
        element={
          <FrontLayout>
            <Faq />
          </FrontLayout>
        }
      />
      <Route
        path="/mandl_frontend/blog"
        element={
          <FrontLayout>
            <Blog />
          </FrontLayout>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <>
      {/* <RouterProvider router={router} /> */}

      <Home />
    </>
  );
}

export default App;
