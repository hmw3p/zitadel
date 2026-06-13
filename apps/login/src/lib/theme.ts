// Theme configuration system for customizable login experience

export type ThemeRoundness = "edgy" | "mid" | "full";
export type ThemeLayout = "side-by-side" | "top-to-bottom";
export type ThemeAppearance = "flat" | "material" | "glass";
export type ThemeSpacing = "regular" | "compact";

export interface ComponentRoundnessConfig {
  card: ThemeRoundness;
  button: ThemeRoundness;
  input: ThemeRoundness;
  image: ThemeRoundness;
  avatar: ThemeRoundness;
  avatarContainer: ThemeRoundness;
  themeSwitch: ThemeRoundness;
}

export interface ThemeConfig {
  roundness: ThemeRoundness; // Global fallback
  componentRoundness?: ComponentRoundnessConfig; // Component-specific overrides
  layout: ThemeLayout;
  backgroundImage?: string;
  appearance: ThemeAppearance;
  spacing: ThemeSpacing;
}

// Default component-specific roundness configuration
export const DEFAULT_COMPONENT_ROUNDNESS: ComponentRoundnessConfig = {
  card: "mid",
  button: "mid",
  input: "mid",
  image: "mid",
  avatar: "full", // Avatars default to full roundness
  avatarContainer: "full", // Avatar containers default to full roundness
  themeSwitch: "full", // Theme switch defaults to full roundness
};

// Default theme configuration
export const DEFAULT_THEME: ThemeConfig = {
  roundness: "mid",
  componentRoundness: DEFAULT_COMPONENT_ROUNDNESS,
  layout: "side-by-side",
  appearance: "material",
  spacing: "regular",
};

// Get theme configuration from environment variables
export function getThemeConfig(): ThemeConfig {
  const globalRoundness = process.env.NEXT_PUBLIC_THEME_ROUNDNESS as ThemeRoundness;

  // If global roundness is set via env var, use it for all components
  // Otherwise, use component-specific defaults
  const componentRoundness = globalRoundness
    ? {
        card: globalRoundness,
        button: globalRoundness,
        input: globalRoundness,
        image: globalRoundness,
        avatar: globalRoundness,
        avatarContainer: globalRoundness,
        themeSwitch: globalRoundness,
      }
    : DEFAULT_COMPONENT_ROUNDNESS;

  return {
    roundness: globalRoundness || DEFAULT_THEME.roundness,
    componentRoundness: componentRoundness,
    layout: (process.env.NEXT_PUBLIC_THEME_LAYOUT as ThemeLayout) || DEFAULT_THEME.layout,
    backgroundImage: process.env.NEXT_PUBLIC_THEME_BACKGROUND_IMAGE || undefined,
    appearance: (process.env.NEXT_PUBLIC_THEME_APPEARANCE as ThemeAppearance) || DEFAULT_THEME.appearance,
    spacing: (process.env.NEXT_PUBLIC_THEME_SPACING as ThemeSpacing) || DEFAULT_THEME.spacing,
  };
}

// Roundness CSS classes
export const ROUNDNESS_CLASSES = {
  edgy: {
    card: "rounded-none",
    button: "rounded-none",
    input: "rounded-none",
    image: "rounded-none",
    avatar: "rounded-none",
    avatarContainer: "rounded-none",
    themeSwitch: "rounded-none",
  },
  mid: {
    card: "rounded-[10px]",
    button: "rounded-[7px]",
    input: "rounded-[7px]",
    image: "rounded-[10px]",
    avatar: "rounded-[10px]",
    avatarContainer: "rounded-[7px]",
    themeSwitch: "rounded-[7px]",
  },
  full: {
    card: "rounded-3xl",
    button: "rounded-full",
    input: "rounded-full pl-4",
    image: "rounded-full",
    avatar: "rounded-full",
    avatarContainer: "rounded-full",
    themeSwitch: "rounded-full",
  },
} as const;

// Helper function to get component-specific roundness
export function getComponentRoundness(componentType: keyof ComponentRoundnessConfig): string {
  const themeConfig = getThemeConfig();

  // Use component-specific roundness if available, otherwise fall back to global roundness
  const roundnessLevel = themeConfig.componentRoundness?.[componentType] || themeConfig.roundness;

  return ROUNDNESS_CLASSES[roundnessLevel][componentType];
}

// Spacing configuration
export const SPACING_STYLES = {
  regular: {
    spacing: "space-y-6",
    padding: "p-6",
  },
  compact: {
    spacing: "space-y-4",
    padding: "p-4",
  },
} as const;

// Appearance styling (complete design philosophies)
export const APPEARANCE_STYLES = {
  flat: {
    card: "border border-[#dde6eb] bg-white shadow-none",
    button: "filter-none",
    "idp-button": "filter-none",
    typography: "font-normal",
    background: "bg-white",
  },
  material: {
    card: "border border-[#dde6eb] bg-white shadow-[0_24px_60px_-48px_rgba(29,29,29,0.32)]",
    button: "will-change-transform",
    "idp-button": "will-change-transform",
    typography: "font-medium",
    background: "bg-white",
  },
  glass: {
    card: "backdrop-blur-md bg-white/80 border border-white/70 shadow-xl",
    button: "backdrop-blur-sm will-change-transform",
    "idp-button": "backdrop-blur-sm will-change-transform",
    typography: "font-medium",
    background: "bg-transparent",
  },
} as const;
