export type Package = {
  gallery: any[];
  image: string;
  pricing: {
    basePrice: number;
    currency: string;
  };
  duration: { days: number; nights: number };
  title: string;
  description: string;
  review: string;
  rating: number;
  slug: string | any;
  sites: string[];
  seoDescription: string;
  averageRating: {
    average: number;
    totalReviews: number;
  };
};
