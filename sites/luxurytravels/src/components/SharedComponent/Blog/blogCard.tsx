import React from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";
import ClientImageWithFallback from "@/components/Common/ClientImageWithFallback";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const { title, coverImage, excerpt, publishedDate, slug, categories, id } =
    blog;

  return (
    <div className="group mb-0 relative">
      <Link href={`/blog/${id}`} aria-label="blog cover" className="group">
        <div className="mb-8 relative rounded-3xl overflow-hidden">
          <ClientImageWithFallback
            src={`${process.env.PAYLOAD_CMS_MEDIA_URL}/${coverImage?.url}`}
            alt={title}
            className="w-full transition group-hover:scale-125"
            width={408}
            height={272}
            style={{ width: "100%", height: "250px" }}
            quality={100}
            fallbackSrc="/images/default/no-blog-cover.avif"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent ">
            {categories && categories.length > 0 && (
              <div className=" m-2 mb-3 flex flex-wrap-reverse flex-row items-start  max-h-[80px] overflow-hidden">
                {categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="text-xs inline-block  mx-1 my-1 font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  >
                    {cat?.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <h3 className="mb-4 inline-block font-semibold text-midnight_text group-hover:text-primary dark:text-white dark:hover:text-primary text-[22px] leading-[2rem]">
            {title}
          </h3>
          <span className="text-sm font-semibold leading-loose text-SereneGray">
            {format(new Date(publishedDate), "dd MMM yyyy")}
          </span>
        </div>
      </Link>
    </div>
  );
  return (
    <Link
      href={`/blog/${id}`}
      className="
        block max-w-sm w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 
        bg-white dark:bg-gray-900 shadow-sm 
        transition-transform transition-shadow duration-300 ease-in-out
        hover:shadow-lg hover:scale-105 hover:-translate-y-1
        "
      aria-label={`Read more about ${title}`}
    >
      <div className="relative w-full h-48 md:h-56 overflow-hidden">
        <ClientImageWithFallback
          src={`${process.env.PAYLOAD_CMS_MEDIA_URL}/${coverImage?.url}`}
          alt={title}
          fill
          style={{ objectFit: "cover", filter: "brightness(0.75)" }}
          quality={90}
          sizes="(max-width: 768px) 100vw, 400px"
          priority={true}
          fallbackSrc="/images/default/no-blog-cover.avif"
        />
      </div>

      <div className="p-5 relative  h-[220px] ">
        {categories && categories.length > 0 && (
          <div className="mb-3 flex gap-2 overflow-hidden whitespace-nowrap">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                {cat?.name}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {excerpt}
        </p>

        <time
          dateTime={publishedDate}
          className="absolute bottom-5 left-5 text-xs font-medium text-gray-400 dark:text-gray-500"
        >
          {format(new Date(publishedDate), "dd MMM yyyy")}
        </time>
      </div>
    </Link>
  );
};

export default BlogCard;
