import { createContext, useContext, type ReactNode } from "react";
import type { ManagementContextValue } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { database } from "@/core/api";
import { isValidUUID } from "@/shared/utils/is-valid-uuid";

const ManagementContext = createContext<ManagementContextValue | null>(null);

export const ManagementProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const walletId = params.walletId;
  const valid = isValidUUID(walletId);

  if (!valid)
    return (
      <div className="w-full min-h-screen grid place-items-center">
        <span>Invalid ID</span>
      </div>
    );

  const query = useQuery({
    queryKey: [walletId],
    queryFn: async () => {
      const { data, error } = await database
        .from("wallets")
        .select("*")
        .eq("id", walletId)
        .maybeSingle();

      if (error) throw error;

      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 menit
    refetchOnWindowFocus: false,
  });

  return (
    <ManagementContext.Provider value={query}>
      {children}
    </ManagementContext.Provider>
  );
};

export const useManagement = () => {
  const ctx = useContext(ManagementContext);

  if (!ctx) {
    throw new Error("useManagement must be used inside <ManagementProvider>");
  }

  return ctx;
};
