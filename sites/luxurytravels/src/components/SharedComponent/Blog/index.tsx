import React from "react";
import Link from "next/link";
import BlogCard from "./blogCard";

import { Blog as BlogType } from "@/types/blog";

async function fetchBlogPost(): Promise<BlogType[]> {
  const res = await fetch(`${process.env.PAYLOAD_CMS_API_URL}/blogs`, {
    cache: "no-store", // or 'force-cache' if you want caching
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  const data = await res.json();
  return data.docs || data;
}
const Blog: React.FC = async () => {
   const blogPosts = await fetchBlogPost();

  const filteredBlogPosts = blogPosts?.filter(
    (post) => post?.sites && post?.sites?.includes("travel")
  );
  return (
    <section className="flex flex-wrap justify-center dark:bg-semidark">
      <div className="container mx-auto max-w-6xl lg:px-0 px-4">
        <div className="flex items-baseline justify-center flex-wrap">
          <h2 className="sm:mb-11 mb-3 text-4xl font-bold text-midnight_text dark:text-white">
            Recent Blog
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-7">
          {filteredBlogPosts.map((blog, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={`${i * 400}`}
              data-aos-duration="1000"
              className="w-full lg:col-span-4 sm:col-span-6 col-span-12"
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
