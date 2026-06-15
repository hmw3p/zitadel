"use client";

import { APPEARANCE_STYLES, getComponentRoundness, getThemeConfig } from "@/lib/theme";
import { clsx } from "clsx";
import { Loader2Icon } from "lucide-react";
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
import { useFormStatus } from "react-dom";

export type SignInWithIdentityProviderProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  name?: string;
  e2e?: string;
};

// Helper function to get default IDP button appearance from centralized theme system
function getDefaultIdpButtonAppearance(): string {
  const themeConfig = getThemeConfig();
  const appearance = APPEARANCE_STYLES[themeConfig.appearance];
  return appearance?.["idp-button"] || "will-change-transform";
}

export const BaseButton = forwardRef<HTMLButtonElement, SignInWithIdentityProviderProps>(function BaseButton(props, ref) {
  const formStatus = useFormStatus();
  const buttonRoundness = getComponentRoundness("button");
  const idpButtonAppearance = getDefaultIdpButtonAppearance();

  return (
    <button
      {...props}
      data-slot="button"
      type="submit"
      ref={ref}
      disabled={formStatus.pending}
      className={clsx(
        "motion-ui flex h-11 flex-1 cursor-pointer flex-row items-center border border-[#dde6eb] bg-white px-4 text-sm font-semibold tracking-[-0.01em] text-text-light-500 drop-shadow-[0_8px_8px_rgba(29,29,29,0.10)] outline-none hover:border-primary-light-500/35 hover:bg-[#e7f7fd] focus-visible:border-primary-light-500 focus-visible:ring-4 focus-visible:ring-primary-light-500/25 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
        buttonRoundness,
        idpButtonAppearance,
        props.className,
      )}
    >
      <div className="flex flex-1 items-center justify-between gap-4">
        <div className="flex flex-1 flex-row items-center">{props.children}</div>
        {formStatus.pending && <Loader2Icon className="h-4 w-4 animate-spin" />}
      </div>
    </button>
  );
});
