import React from "react";
import Link from "next/link";
import DestinationCard from "./destinationCard";

import { Destination as DestinationType } from "@/types/destination";
import qs from "qs";
async function fetchBlogPost(): Promise<DestinationType[]> {
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
  const res = await fetch(
    `${process.env.PAYLOAD_CMS_API_URL}/destinations?${query}`,
    {
      cache: "no-store", // or 'force-cache' if you want caching
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch destinations");
  }
  const data = await res.json();
  return data.docs || data;
}
const Destination: React.FC = async () => {
  const blogPosts = await fetchBlogPost();

  const filteredBlogPosts = blogPosts;
  return (
    <section className="flex flex-wrap justify-center dark:bg-semidark">
      <div className="container mx-auto max-w-6xl lg:px-0 px-4">
        <div className="flex items-baseline justify-center flex-wrap">
          <h2 className="sm:mb-11 mb-3 text-4xl font-bold text-midnight_text dark:text-white">
            Recommended Destinations
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
              <DestinationCard destination={blog} />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/destination"
            className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Destination;
