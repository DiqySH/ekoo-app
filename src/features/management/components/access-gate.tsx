import type { ReactNode } from "react";
import { useManagement } from "@/features/management/contexts/management";

interface RouteAccessGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: (error: string) => ReactNode;
  loadingFallback?: ReactNode;
}

const DEFAULT_LOADING = (
  <div className="w-full min-h-screen grid place-items-center">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
      alt=""
      className="max-w-40"
    />
  </div>
);
const DEFAULT_DENIED = (
  <div className="w-full min-h-screen grid place-items-center">
    <span>Access Denied</span>
  </div>
);
const DEFAULT_ERROR = (error: string) => (
  <div className="w-full min-h-screen grid place-items-center">
    <span>Error: {error}</span>
  </div>
);

export const AccessGate = ({
  children,
  fallback,
  errorFallback,
  loadingFallback,
}: RouteAccessGuardProps) => {
  const { data, isLoading, error } = useManagement();

  return (
    <>
      {isLoading && (loadingFallback ?? DEFAULT_LOADING)}
      {!isLoading &&
        error &&
        (errorFallback?.(error.message) ?? DEFAULT_ERROR(error.message))}
      {!isLoading && !error && !data && (fallback ?? DEFAULT_DENIED)}
      {!isLoading && !error && data && children}
    </>
  );
};
