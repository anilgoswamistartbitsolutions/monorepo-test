export type Blog = {
  id: string;
  title: string;
  slug: string;
  author: any; // or `User` if you have a User type
  publishedDate: string; // ISO date string
  status: "draft" | "published" | "archived";
  excerpt: string;
  content: any; // Replace with a stricter type if you define rich text structure
  coverImage: any; // or `Media` if you have a Media type
  categories?: Array<{
    name: string;
    slug: string;
  }>;
  tags?: Array<{
    tag: string;
    id: string;
  }>;
  seoTitle?: string;
  seoDescription?: string;
  sites: Array<"holiday-deals" | "travel">;
  createdAt: string;
  updatedAt: string;
};
