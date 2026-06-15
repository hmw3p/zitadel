"use client";
import { ThemeProvider as ThemeP } from "next-themes";
import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeP attribute="class" forcedTheme="light" enableSystem={false} storageKey="cp-theme" value={{ light: "light" }}>
      {children}
    </ThemeP>
  );
}
