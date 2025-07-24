export type Package = {
  id:string;
  gallery: any[];
  content: any;

  image: string;
  pricing: {
    basePrice: number;
    currency: string;
    priceIncludes: { item: string }[];
    priceExcludes: { item: string }[];
  };
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: { activity: string }[];
  }[];
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
  availability: any;
};
