/**
 * Pastel Theme Configuration
 * Responsive design system with pastel colors
 */

export const colors = {
  // Pastel palette
  primary: '#FFB6C1',      // Pastel Pink
  secondary: '#B4E7CE',    // Pastel Green
  accent: '#C7CEEA',       // Pastel Blue
  background: '#FFF9F9',   // Very light pink
  surface: '#FFFFFF',
  
  // Yogurt colors
  strawberry: '#FFB3BA',
  blueberry: '#BAE1FF',
  mango: '#FFFFBA',
  matcha: '#BAFFC9',
  
  // UI colors
  text: {
    primary: '#4A4A4A',
    secondary: '#8A8A8A',
    light: '#B8B8B8',
  },
  border: '#F0E5E5',
  error: '#FFB4B4',
  success: '#B4E7CE',
  warning: '#FFE4B5',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Responsive breakpoints
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
};

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
  breakpoints,
};

export type Theme = typeof theme;
