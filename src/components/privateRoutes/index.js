import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const PrivateRoutes = () => {
  const cookieExists = Cookies.get("token");

  if (!cookieExists) {
    toast.error("Please login to continue", {
      toastId: "login1",
    });
  }

  return <>{cookieExists ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateRoutes;
