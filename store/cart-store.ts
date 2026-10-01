'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartLine {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  addItem: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addItem: (productId, variantId, quantity) =>
        set((state) => {
          const existing = state.lines.find(
            (l) => l.productId === productId && l.variantId === variantId
          );
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.id === existing.id
                  ? { ...l, quantity: Math.min(l.quantity + quantity, 10) }
                  : l
              ),
            };
          }
          const newLine: CartLine = {
            id: `${productId}-${variantId}-${Date.now()}`,
            productId,
            variantId,
            quantity,
          };
          return { lines: [...state.lines, newLine] };
        }),
      removeItem: (id) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          lines: state.lines.map((l) =>
            l.id === id ? { ...l, quantity: Math.max(1, Math.min(quantity, 10)) } : l
          ),
        })),
      clearCart: () => set({ lines: [] }),
      getCount: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
    }),
    {
      name: 'awa-cart',
    }
  )
);
