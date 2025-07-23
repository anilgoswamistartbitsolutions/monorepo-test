export type Destination = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: any; // Replace with a stricter type if you define rich text structure
  country: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  gallery: any;
  attractions: [{
    attraction: string;
    id: string;
  }];
  bestTimeToVisit: string;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  sites: Array<"holiday-deals" | "travel">;
  createdAt: string;
  updatedAt: string;
};
