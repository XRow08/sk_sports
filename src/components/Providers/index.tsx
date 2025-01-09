"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { Layout } from "./Layout";
import { CartProvider } from "./CartProvider";
import { AuthProvider } from "./AuthProvider";

export * from "./AuthProvider";

const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Layout>{children}</Layout>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
