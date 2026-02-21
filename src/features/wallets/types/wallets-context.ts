import type { WalletItem } from "@/shared/types/wallet";
import type { UseQueryResult } from "@tanstack/react-query";

export type WalletsContextValue = UseQueryResult<WalletItem[], Error>;
