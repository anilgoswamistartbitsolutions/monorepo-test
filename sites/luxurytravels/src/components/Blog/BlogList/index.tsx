import React from "react";
import BlogCard from "@/components/SharedComponent/Blog/blogCard";
import { getAllPosts } from "@/utils/markdown";
import { Blog } from "@/types/blog";
import qs from "qs";
async function fetchBlogPost(): Promise<Blog[]> {
  const query = qs.stringify(
    {
      where: {
        sites: {
          in: ["all", "luxury-travel"],
        },
      },
    },
    { encodeValuesOnly: true }
  );
  const res = await fetch(`${process.env.PAYLOAD_CMS_API_URL}/blogs?${query}`, {
    cache: "no-store", // or 'force-cache' if you want caching
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  const data = await res.json();
  return data.docs || data;
}

const BlogList: React.FC = async () => {
  const blogPosts = await fetchBlogPost();

  const filteredBlogPosts = blogPosts;

  return (
    <section
      className="flex flex-wrap justify-center pt-8 pb-0 dark:bg-darkmode"
      id="blog"
    >
      <div className="container mx-auto max-w-6xl lg:px-0 px-4">
        <div className="grid grid-cols-12 gap-7">
          {filteredBlogPosts.map((blog, i) => (
            <div
              key={i}
              className="w-full lg:col-span-4 md:col-span-6 col-span-12"
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
