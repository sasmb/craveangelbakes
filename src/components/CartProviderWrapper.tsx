"use client";

import { CartProvider } from "@/contexts/CartContext";

interface CartProviderWrapperProps {
  children: React.ReactNode;
}

export function CartProviderWrapper({ children }: CartProviderWrapperProps) {
  return <CartProvider>{children}</CartProvider>;
} 