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
                  className="overflow-hidden border border-[#dde6eb] bg-white shadow-[0_32px_80px_-56px_rgba(29,29,29,0.34)]"
                  padding="p-0"
                  roundness="rounded-[12px]"
                >
                  <div className="flex min-h-[680px] items-center justify-center px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
                      <div className="w-full max-w-[460px] space-y-8">
                        <div className="space-y-6">
                          <TriniprintWordmark />
                          {hasLeftRightStructure && (
                            <div className="space-y-4 [&_h1]:text-left [&_h1]:text-[2rem] [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:tracking-[-0.03em] [&_h1]:text-[#1d1d1d] [&_p]:text-left [&_p]:text-base [&_p]:leading-7 [&_p]:text-[#525252]">
                              {leftContent}
                            </div>
                          )}
                        </div>

                        <div className="space-y-6">{hasLeftRightStructure ? rightContent : leftContent}</div>
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
