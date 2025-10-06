"use client";

import { CartProvider } from "@/contexts/CartContext";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  return <CartProvider>{children}</CartProvider>;
} 