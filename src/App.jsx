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

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={
          <FrontLayout>
            <Home />
          </FrontLayout>
        }
      />
      <Route
        path="/about"
        element={
          <FrontLayout>
            <About />
          </FrontLayout>
        }
      />
      <Route
        path="/faq"
        element={
          <FrontLayout>
            <Faq />
          </FrontLayout>
        }
      />
      <Route
        path="/blog"
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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
