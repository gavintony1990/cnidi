import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { tokenStorage } from "../utils/token";

interface Props {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const location = useLocation();
  if (!tokenStorage.exists()) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
}
