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
import BlogPost from "./screens/blogPost";
import Login from "./screens/login";
import CategoryTemplate from "./screens/categoryTemplate";

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
      <Route
        path="/blog/:post"
        element={
          <FrontLayout>
            <BlogPost />
          </FrontLayout>
        }
      />
      <Route
        path="/medicine"
        element={
          <FrontLayout>
            <CategoryTemplate type="medicine" />
          </FrontLayout>
        }
      />
      <Route
        path="/education"
        element={
          <FrontLayout>
            <CategoryTemplate type="education" />
          </FrontLayout>
        }
      />
      <Route
        path="/humanitarian-aid"
        element={
          <FrontLayout>
            <CategoryTemplate type="aid" />
          </FrontLayout>
        }
      />
      <Route path="/login" element={<Login />} />
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