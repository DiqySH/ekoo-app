import type { UseQueryResult } from "@tanstack/react-query";
import type { Wallet } from "./wallet";

export type ManagementContextValue = UseQueryResult<Wallet>;
