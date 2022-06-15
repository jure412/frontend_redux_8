import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Page404 from "../pages/page404/Page404";
import RouteGuard from "./RouteGuard";

const Routes = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/home", element: <RouteGuard auth={true} page={<Home />} /> },
        {
          path: "/login",
          element: <RouteGuard auth={false} page={<Login />} />,
        },
        { path: "*", element: <Page404 /> },
      ],
    },
    { path: "*", element: <Page404 /> },
  ]);

  return routes;
};

export default Routes;

// HELP SOURCES

// https://stackoverflow.com/questions/65425884/react-router-v6-error-useroutes-may-be-used-only-in-the-context-of-a-route
// https://stackoverflow.com/questions/64626074/implementing-protected-routing-with-react-router-v6
