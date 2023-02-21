import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  }
]);

export default router;