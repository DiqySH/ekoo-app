import { useAuth } from "@/context/auth";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

export const Public = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>loading...</p>;
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
