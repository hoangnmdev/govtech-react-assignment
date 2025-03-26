import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "./components/common/ErrorNotFound";
import SearchPage from "./pages/SearchPage";
import ErrorBoundary from "./components/common/ErrorBoundary";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
