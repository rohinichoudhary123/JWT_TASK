import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { myStore } from "../context/AppContext";
const ProtectedRouter = () => {
  const { isLoggedIn } = useContext(myStore);

 
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRouter;
