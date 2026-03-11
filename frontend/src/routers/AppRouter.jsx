import React from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AuthLayout from '../layouts/AuthLayout';
import HomeLayout from '../layouts/HomeLayout';
import ProfilePage from '../pages/ProfilePage';
import ProtectedRouter from '../components/ProtectedRouter';
import PublicRoute from '../components/PublicRoute';
import Verify from '../components/Verify';
const AppRouter = () => {

    const router = createBrowserRouter([
        {
            element: <ProtectedRouter/>,
            children: [
                {
                    path: "/",
                    element: <HomeLayout/>
                },
                {
                    path:'/profile',
                    element:<ProfilePage/>
                }
            ]
        },
        {
            element: <PublicRoute/>,
            children: [
                {
                    path: "/login",
                    element: <AuthLayout/>
                },
                {
                    path:"/verify-link/:token",
                    element:<Verify/>
                }
            ]
        }
    ])
  return   <RouterProvider router={router} />
}

export default AppRouter