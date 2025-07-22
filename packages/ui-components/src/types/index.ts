// Core travel platform types
export interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  gallery?: string[];
  featured: boolean;
  pricing: {
    basePrice: number;
    currency: string;
    priceIncludes: string[];
    priceExcludes: string[];
  };
  duration: {
    days: number;
    nights: number;
  };
  destination: string;
  rating: number;
  reviewCount: number;
  categories: string[];
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  country: string;
  region: string;
  image: string;
  gallery?: string[];
  featured: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  attractions: string[];
  bestTimeToVisit: string;
}

export interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  price?: {
    amount: number;
    currency: string;
    duration: string;
  };
  searchForm?: boolean;
  variant?: 'default' | 'luxury' | 'adventure' | 'family';
}

export interface TourCardProps {
  tour: Tour;
  variant?: 'default' | 'luxury' | 'adventure' | 'family';
  showPrice?: boolean;
  className?: string;
}

// Legacy type for compatibility with existing template
export interface PackageType {
  image: string;
  name: string;
  slug: string;
  price: string;
  duration: string;
  review: string;
  no_review: string;
  rating: number;
} 