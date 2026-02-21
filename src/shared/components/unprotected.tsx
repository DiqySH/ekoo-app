import { useAuth } from "@/features/auth/contexts/auth";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

export const Unprotected = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>loading...</p>;
  if (isAuthenticated) return <Navigate to="/chat" replace />;

  return children;
};
