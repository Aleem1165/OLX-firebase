import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../view/login";
import Signup from "../view/signup";
import Dashboard from "../view/dashboard";
import Layout from "../view/layout";
import DashboardLayout from "../view/dashboardLayout";
import ProtectedRoute from "./protectedRoute";
import CircularStatic from "../compunents/loader";
// import MyProfile from "../view/myprofile";
import BasicModal from "../compunents/muiModal";
import CreateAddBasicModal from "../compunents/createAddModal";
import DashboardCircularStatic from "../compunents/loader";
import Adddetail from "../view/addDetail";
import FavoriteAdd from "../view/favoriteAdd/favoriteAdd";
import MyFavoriteAdddetail from "../view/myFavoriteAddDetail";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />,
        // element: <ProtectedRoute Compunent={Login}/>
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path:"/loader",
        element:<CircularStatic/>
      }
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
          path:"/dashboard",
        element: <ProtectedRoute Compunent={Dashboard}/>
      },
      {
        path:"/dashboard/myProfile",
        element:<BasicModal/>
      },
      {
        path:"/dashboard/createAdd",
        element:<CreateAddBasicModal/>
      },
      {
        path:"/dashboardLoader",
        element:<DashboardCircularStatic/>
      }
      ,
      {
        path:"/dashboard/addDetail/:docId",
        element:<Adddetail/>
      }
      ,
      {
        path:"/dashboard/MyFavoriteAdd",
        element:<FavoriteAdd/>
      }
      ,
      {
        path:"/dashboard/MyFavoriteAdd/addDetail/:docId",
        element:<MyFavoriteAdddetail/>
      }
    ],
  },
]);

const Routing = () => {
  return <RouterProvider router={router} />;
};

export default Routing;

