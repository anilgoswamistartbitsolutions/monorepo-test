// Site variants for theming
export const SITE_VARIANTS = {
  DEFAULT: 'default',
  LUXURY: 'luxury',
  ADVENTURE: 'adventure',
  FAMILY: 'family',
} as const;

export type SiteVariant = typeof SITE_VARIANTS[keyof typeof SITE_VARIANTS];

// Theme configurations for different site variants
export const VARIANT_THEMES = {
  [SITE_VARIANTS.DEFAULT]: {
    primary: '#3B82F6',
    secondary: '#1F2937',
    accent: '#F59E0B',
  },
  [SITE_VARIANTS.LUXURY]: {
    primary: '#D4AF37',
    secondary: '#1A1A1A', 
    accent: '#FFFFFF',
  },
  [SITE_VARIANTS.ADVENTURE]: {
    primary: '#22C55E',
    secondary: '#1F2937',
    accent: '#F59E0B',
  },
  [SITE_VARIANTS.FAMILY]: {
    primary: '#3B82F6',
    secondary: '#1E40AF',
    accent: '#F472B6',
  },
} as const;

// Common animation durations
export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const; 