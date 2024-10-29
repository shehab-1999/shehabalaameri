"use client";
import {
  QueryClientProvider,
  QueryClient,
  MutationCache,
  QueryCache,
} from "@tanstack/react-query";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    mutationCache: new MutationCache(),
    queryCache: new QueryCache(),
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchInterval: Infinity,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
        enabled: true,
      },
      mutations: {
        networkMode: "offlineFirst",
        retry: Infinity,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
        onError: (error) => {
          console.error("Mutation error:", error);
        },
        onSuccess: (data) => {
          console.log("Mutation success:", data);
        },
        onSettled: () => {
          console.log("Mutation settled");
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
