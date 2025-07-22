// Export all components
export { default as Hero } from './components/Hero';
export { default as TourCard } from './components/TourCard';
export { default as Header } from './components/Header';
export { default as Footer } from './components/Footer';

// Export shared styles
export * from './styles';

// Re-export types for convenience
export type { HeroProps, TourCardProps, Tour, Destination } from '@travel-platform/shared-utils'; 