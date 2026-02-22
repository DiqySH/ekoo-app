import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { RouteAccessContextValue } from "../types";
import { useManagement } from "./management";
import { useAuth } from "@/features/auth/contexts/auth";

const RouteAccessContext = createContext<RouteAccessContextValue | null>(null);

export const RouteAccessProvider = ({ children }: { children: ReactNode }) => {
  const [access, setAccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] =
    useState<RouteAccessContextValue["error"]>(undefined);

  const { user } = useAuth();
  const { data } = useManagement();

  useEffect(() => {
    setIsLoading(true);
    setError(undefined);

    try {
      if (!user) {
        setAccess(false);
        return;
      }

      if (!data) {
        setAccess(false);
        return;
      }

      const hasAccess = data.users_id?.includes(user.id) ?? false;
      setAccess(hasAccess);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
      setAccess(false);
    } finally {
      setIsLoading(false);
    }
  }, [user, data]);

  return (
    <RouteAccessContext.Provider value={{ access, isLoading, error }}>
      {children}
    </RouteAccessContext.Provider>
  );
};

export const useRouteAccess = () => {
  const ctx = useContext(RouteAccessContext);

  if (!ctx) {
    throw new Error("useRouteAccess must be used inside <RouteAccessProvider>");
  }

  return ctx;
};
