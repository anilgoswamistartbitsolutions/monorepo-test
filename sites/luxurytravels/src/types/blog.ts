export type Blog = {
  id: string;
  title: string;
  slug: string;
  author: string; // or `User` if you have a User type
  publishedDate: string; // ISO date string
  status: 'draft' | 'published' | 'archived';
  excerpt: string;
  content: any; // Replace with a stricter type if you define rich text structure
  coverImage: string; // or `Media` if you have a Media type
  categories?: Array<{
    category: string;
  }>;
  tags?: Array<{
    tag: string;
  }>;
  seoTitle?: string;
  seoDescription?: string;
  sites: Array<'holiday-deals' | 'travel'>;
  createdAt: string;
  updatedAt: string;
};
