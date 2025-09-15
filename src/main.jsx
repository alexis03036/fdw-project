import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import Singup from "./pages/Singup.jsx";
import Homepaged from "./pages/Homepaged.jsx";
import CourseLesson from "./pages/CourseLesson.jsx";
import Homepages from "./pages/Homepages.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import StudentLesson from "./pages/StudentLesson.jsx";

export const API_URL = import.meta.env.VITE_API_URL;

{
  /*CSS di Bootstrap vale su tutte le app però mettendo prima di index.css lo posso sovrascrivere*/
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage></Homepage>,
  },
  {
    path: "/Singup",
    element: <Singup></Singup>,
  },
  {
    path: "/Login",
    element: <Login></Login>,
  },
  {
    path: "/Homepaged",
    element: <Homepaged></Homepaged>,
  },
  {
    path: "/Homepaged/corso/:corsoId/lezione",
    element: <CourseLesson />,
  },
  {
    path: "/Homepages",
    element: <Homepages />,
  },
  {
    path: "/studente/lezione/:corsoId",
    element: <StudentLesson />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
