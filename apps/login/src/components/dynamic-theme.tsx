"use client";

import { useResponsiveLayout } from "@/lib/theme-hooks";
import { BrandingSettings } from "@zitadel/proto/zitadel/settings/v2/branding_settings_pb";
import React, { Children, ReactNode } from "react";
import { Card } from "./card";
import { ThemeWrapper } from "./theme-wrapper";
import { TriniprintWordmark } from "./triniprint-wordmark";

/**
 * DynamicTheme component handles layout switching between traditional top-to-bottom
 * and modern side-by-side layouts based on NEXT_PUBLIC_THEME_LAYOUT.
 *
 * For side-by-side layout:
 * - First child: Goes to left side (title, description, etc.)
 * - Second child: Goes to right side (forms, buttons, etc.)
 * - Single child: Falls back to right side for backward compatibility
 *
 * For top-to-bottom layout:
 * - All children rendered in traditional centered layout
 */
export function DynamicTheme({
  branding,
  children,
}: {
  children: ReactNode | ((isSideBySide: boolean) => ReactNode);
  branding?: BrandingSettings;
}) {
  const { isSideBySide } = useResponsiveLayout();

  // Resolve children immediately to avoid passing functions through React
  const actualChildren: ReactNode = React.useMemo(() => {
    if (typeof children === "function") {
      return (children as (isSideBySide: boolean) => ReactNode)(isSideBySide);
    }
    return children;
  }, [children, isSideBySide]);

  return (
    <ThemeWrapper branding={branding}>
      {isSideBySide
        ? // Side-by-side layout: first child goes left, second child goes right
          (() => {
            const childArray = Children.toArray(actualChildren);
            const leftContent = childArray[0] || null;
            const rightContent = childArray[1] || null;

            // If there's only one child, it's likely the old format - keep it on the right side
            const hasLeftRightStructure = childArray.length === 2;

            return (
              <div className="relative mx-auto w-full max-w-[1240px] px-4 py-4 lg:px-8">
                <Card
                  className="overflow-hidden border border-slate-200/70 bg-white/95 shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-950/90 dark:shadow-black/20"
                  padding="p-0"
                  roundness="rounded-[28px]"
                >
                  <div className="grid min-h-[680px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                    <div className="flex items-center justify-center px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
                      <div className="w-full max-w-[460px] space-y-8">
                        <div className="space-y-6">
                          <TriniprintWordmark />
                          {hasLeftRightStructure && (
                            <div className="space-y-5 [&_h1]:text-left [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:text-slate-950 [&_h1]:dark:text-white [&_p]:text-left [&_p]:text-base [&_p]:leading-7 [&_p]:text-slate-600 [&_p]:dark:text-slate-300">
                              {leftContent}
                            </div>
                          )}
                        </div>

                        <div className="space-y-6">{hasLeftRightStructure ? rightContent : leftContent}</div>
                      </div>
                    </div>

                    <div className="relative hidden overflow-hidden bg-slate-950 lg:flex">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_38%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.3),_transparent_42%),linear-gradient(160deg,_#0f172a_0%,_#111827_45%,_#020617_100%)]" />
                      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.05)_42%,transparent_70%)]" />
                      <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-12">
                        <div className="flex items-center justify-between text-white/70">
                          <TriniprintWordmark compact />
                          <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/75">
                            Workspace Access
                          </span>
                        </div>

                        <div className="flex items-center justify-center py-8">
                          <img
                            src="/triniprint-auth-hero.svg"
                            alt="Triniprint workspace preview"
                            className="w-full max-w-[560px]"
                          />
                        </div>

                        <div className="grid gap-4 text-white sm:grid-cols-3">
                          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">Orders</p>
                            <p className="mt-2 text-2xl font-semibold">128</p>
                            <p className="mt-2 text-sm text-white/60">Active production jobs synced live.</p>
                          </div>
                          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">Queues</p>
                            <p className="mt-2 text-2xl font-semibold">6</p>
                            <p className="mt-2 text-sm text-white/60">Press, finishing, packing, and dispatch.</p>
                          </div>
                          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">Status</p>
                            <p className="mt-2 text-2xl font-semibold">Live</p>
                            <p className="mt-2 text-sm text-white/60">Your team dashboard is ready after sign-in.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })()
        : // Traditional top-to-bottom layout - center title/description, left-align forms
          (() => {
            const childArray = Children.toArray(actualChildren);
            const titleContent = childArray[0] || null;
            const formContent = childArray[1] || null;
            const hasMultipleChildren = childArray.length > 1;

            return (
              <div className="relative mx-auto w-full max-w-[440px] px-4 py-4">
                <Card>
                  <div className="mx-auto flex flex-col items-center space-y-8">
                    <div className="relative -mb-1 flex w-full flex-row items-center justify-center">
                      <TriniprintWordmark />
                    </div>

                    {hasMultipleChildren ? (
                      <>
                        {/* Title and description - center aligned */}
                        <div className="mb-4 flex w-full flex-col items-center text-center">{titleContent}</div>

                        {/* Form content - left aligned */}
                        <div className="w-full">{formContent}</div>
                      </>
                    ) : (
                      // Single child - use original behavior
                      <div className="w-full">{actualChildren}</div>
                    )}

                    <div className="flex flex-row justify-between"></div>
                  </div>
                </Card>
              </div>
            );
          })()}
    </ThemeWrapper>
  );
}
