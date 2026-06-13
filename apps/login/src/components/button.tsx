import { APPEARANCE_STYLES, getComponentRoundness, getThemeConfig } from "@/lib/theme";
import { ThemeableProps } from "@/lib/themeUtils";
import { clsx } from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";

export enum ButtonSizes {
  Small = "Small",
  Large = "Large",
}

export enum ButtonVariants {
  Primary = "Primary",
  Secondary = "Secondary",
  Destructive = "Destructive",
}

export enum ButtonColors {
  Neutral = "Neutral",
  Primary = "Primary",
  Warn = "Warn",
}

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  size?: ButtonSizes;
  variant?: ButtonVariants;
  color?: ButtonColors;
} & ThemeableProps;

export const getButtonClasses = (
  size: ButtonSizes,
  variant: ButtonVariants,
  color: ButtonColors,
  roundnessClasses: string = "rounded-md", // Default fallback
  appearance: string = "", // Theme appearance (shadows, borders, etc.)
) =>
  clsx(
    {
      "motion-ui inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap border font-semibold tracking-[-0.01em] outline-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0":
        true,
      "focus-visible:border-primary-light-500 focus-visible:ring-4 focus-visible:ring-primary-light-500/25": color !== ButtonColors.Warn,
      "focus-visible:border-warn-light-500 focus-visible:ring-4 focus-visible:ring-warn-light-500/20": color === ButtonColors.Warn,
      "border-[#e7f7fd] bg-primary-light-500 text-[#1d1d1d] hover:border-primary-light-500 hover:bg-[#017ead]":
        variant === ButtonVariants.Primary && color !== ButtonColors.Warn,
      "border-warn-light-500 bg-warn-light-500 text-white hover:bg-warn-light-500/90":
        (variant === ButtonVariants.Primary && color === ButtonColors.Warn) ||
        variant === ButtonVariants.Destructive,
      "border-[#dde6eb] bg-white text-[#1d1d1d] hover:border-primary-light-500/35 hover:bg-[#e7f7fd]":
        variant === ButtonVariants.Secondary,
      "border-[#e4b5ba] bg-white text-warn-light-500 hover:bg-warn-light-500/10":
        color === ButtonColors.Warn && variant === ButtonVariants.Secondary,
      "h-14 px-6 text-base": size === ButtonSizes.Large,
      "h-12 px-5 text-base": size === ButtonSizes.Small && variant !== ButtonVariants.Secondary,
      "h-10 px-4 text-sm": size === ButtonSizes.Small && variant === ButtonVariants.Secondary,
    },
    roundnessClasses, // Apply the full roundness classes directly
    appearance, // Apply appearance-specific styling (shadows, borders, etc.)
  );

// Helper function to get default button roundness from theme
function getDefaultButtonRoundness(): string {
  return getComponentRoundness("button");
}

// Helper function to get default button appearance from centralized theme system
function getDefaultButtonAppearance(): string {
  const themeConfig = getThemeConfig();
  const appearance = APPEARANCE_STYLES[themeConfig.appearance];
  return appearance?.button || "border border-transparent shadow-[0_16px_30px_-22px_rgba(1,157,218,0.55)]";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = ButtonVariants.Primary,
      size = ButtonSizes.Small,
      color = ButtonColors.Primary,
      roundness, // Will use theme default if not provided
      ...props
    },
    ref,
  ) => {
    // Use theme-based values if not explicitly provided
    const actualRoundness = roundness || getDefaultButtonRoundness();
    const actualAppearance = getDefaultButtonAppearance();

    return (
      <button
        data-slot="button"
        type="button"
        ref={ref}
        className={`${getButtonClasses(size, variant, color, actualRoundness, actualAppearance)} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);
