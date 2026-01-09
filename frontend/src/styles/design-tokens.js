// Design Tokens - Optic Glass Luxury E-commerce
// Apple-inspired luxury design system

export const colors = {
  // Primary Luxury Palette
  luxury: {
    gold: '#c9a227',
    goldLight: '#d4af37',
    goldDark: '#b8941f',
  },
  
  // Accent Colors
  accent: {
    red: '#DC2626',
    redDark: '#B91C1C',
    redLight: '#EF4444',
  },
  
  // Neutrals
  neutral: {
    black: '#0a0a0a',
    charcoal: '#1a1a1a',
    gray: '#2a2a2a',
    grayLight: '#3a3a3a',
    cream: '#f5f5f0',
    white: '#ffffff',
  },
  
  // Brand Colors (for product cards)
  brands: {
    rayban: { from: '#FCD34D', to: '#FDE68A' },
    gucci: { from: '#FCA5A5', to: '#FECACA' },
    prada: { from: '#E5E7EB', to: '#F3F4F6' },
    tomford: { from: '#FDE047', to: '#FEF08A' },
    dior: { from: '#FBCFE8', to: '#FCE7F3' },
    oakley: { from: '#BFDBFE', to: '#DBEAFE' },
    versace: { from: '#FEF3C7', to: '#FEF9C3' },
    carrera: { from: '#FED7AA', to: '#FFEDD5' },
    persol: { from: '#FED7AA', to: '#FFEDD5' },
  },
  
  // Status Colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
};

export const typography = {
  fonts: {
    display: '"Playfair Display", serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"Fira Code", monospace',
  },
  
  sizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },
  
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
};

export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  gold: '0 0 20px rgba(201, 162, 39, 0.3)',
  goldLg: '0 0 40px rgba(201, 162, 39, 0.5)',
  red: '0 0 20px rgba(220, 38, 38, 0.3)',
};

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '600ms cubic-bezier(0.22, 1, 0.36, 1)',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// Component-specific tokens
export const components = {
  button: {
    primary: {
      bg: `linear-gradient(to right, ${colors.luxury.gold}, ${colors.luxury.goldLight})`,
      text: colors.neutral.black,
      hover: colors.luxury.goldLight,
    },
    secondary: {
      bg: colors.neutral.black,
      text: colors.neutral.white,
      hover: colors.neutral.charcoal,
    },
    outline: {
      border: colors.luxury.gold,
      text: colors.luxury.gold,
      hover: colors.luxury.gold,
    },
  },
  
  card: {
    bg: colors.neutral.white,
    border: '#E5E7EB',
    shadow: shadows.md,
    hoverShadow: shadows.xl,
    hoverBorder: colors.luxury.gold,
  },
  
  input: {
    bg: colors.neutral.white,
    border: '#D1D5DB',
    focus: colors.luxury.gold,
    text: colors.neutral.black,
  },
  
  navbar: {
    bg: `${colors.neutral.black}95`,
    glassBg: `${colors.neutral.black}40`,
    text: colors.neutral.white,
    activeText: colors.luxury.gold,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  zIndex,
  components,
};
