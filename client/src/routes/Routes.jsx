import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProfilePage from "../pages/ProfilePage";
import Feed from "../pages/Feed";
import OpenChat from "../pages/OpenChat";
import DirectLayout from "../components/DirectLayout";
import DetailChat from "../pages/DetailChat";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Feed />,
        },
        {
          path: "/direct",
          element: <DirectLayout />,
          // children: [
          //   {
          //     path: "/direct/inbox",
          //     element: <OpenChat />,
          //   },
          //   {
          //     path: "/direct/inbox/:id",
          //     element: <DetailChat />,
          //   },
          // ],
        },

        {
          path: "/profile/:id",
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Routes;
