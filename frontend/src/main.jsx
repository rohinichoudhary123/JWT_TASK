import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routers/AppRouter.jsx";
import AppContext from "./context/AppContext.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AppContext>
      <AppRouter />
    </AppContext>
  </QueryClientProvider>,
);
