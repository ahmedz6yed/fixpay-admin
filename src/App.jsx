import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 2026 Best Practice: Set a default staleTime to avoid unnecessary refetches
      staleTime: 60 * 1000, // 1 minute
      // Number of retries on failure
      retry: 1,
      // Refetch on window focus is often annoying in dev, but good in prod
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      {/* Devtools: initially hidden, toggled via UI in development */}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}

export default App;
