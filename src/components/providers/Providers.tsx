"use client";

import SmoothScroll from "@/components/ui/SmoothScroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      {children}
    </SmoothScroll>
  );
}
