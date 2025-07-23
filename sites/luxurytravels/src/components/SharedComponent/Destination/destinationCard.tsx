import React from "react";
import Image from "next/image";
import { Destination } from "@/types/destination";
import { format } from "date-fns";
import Link from "next/link";
import ClientImageWithFallback from "@/components/Common/ClientImageWithFallback";

const DestinationCard = ({ destination }: { destination: Destination }) => {
  const {
    title,
    description,
    gallery,
    slug,
    id,
    country,
    region,
    attractions,
  } = destination;

  return (
    <Link
      href={`/destination/${id}`}
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
          src={`${process.env.PAYLOAD_CMS_MEDIA_URL}/${gallery[0]?.url}`}
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
        {attractions && attractions.length > 0 && (
          <div className="mb-3 flex gap-2 overflow-hidden whitespace-nowrap">
            {attractions.map((cat, idx) => (
              <span
                key={idx}
                className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                {cat?.attraction}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {description}
        </p>
        <div className="absolute bottom-5 left-5 text-xs font-medium text-gray-400 dark:text-gray-500">
          <span>
            {country}
            {", "}
          </span>
          <span>{region}</span>
        </div>
        {/* <time
          dateTime={publishedDate}
          className="absolute bottom-5 left-5 text-xs font-medium text-gray-400 dark:text-gray-500"
        >
          {format(new Date(publishedDate), "dd MMM yyyy")}
        </time> */}
      </div>
    </Link>
  );
};

export default DestinationCard;
