import { useRouteError, isRouteErrorResponse } from "react-router";
import NotFoundPage from "./pages/NotFoundPage";

export const RouteErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundPage />;
    }

    return <div>{error.statusText}</div>;
  }

  return <div>Something went wrong</div>;
};
