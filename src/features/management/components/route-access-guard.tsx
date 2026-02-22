import type { ReactNode } from "react";
import { useRouteAccess } from "@/features/management/contexts/route-access";
import { useManagement } from "@/features/management/contexts/management";

interface RouteAccessGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: (error: string) => ReactNode;
  loadingFallback?: ReactNode;
}

export const RouteAccessGuard = ({
  children,
  fallback = <div>Access Denied</div>,
  errorFallback,
  loadingFallback = <div>Loading...</div>,
}: RouteAccessGuardProps) => {
  const { access, isLoading, error } = useRouteAccess();
  const { isLoading: dataLoading } = useManagement();

  if (isLoading || dataLoading) {
    return <>{loadingFallback}</>;
  }

  if (error) {
    return <>{errorFallback?.(error) ?? <div>Error: {error}</div>}</>;
  }

  if (!access) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
