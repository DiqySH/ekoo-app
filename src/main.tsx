import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import router from "./router.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./core/query-client";
import { AuthProvider } from "./features/auth/contexts/auth.tsx";
import { GlobalDataFetcher } from "./core/components/global-data-fetcher.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalDataFetcher />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
