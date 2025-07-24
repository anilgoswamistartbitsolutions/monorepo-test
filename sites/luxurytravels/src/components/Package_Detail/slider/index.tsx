"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import getSymbolFromCurrency from "currency-symbol-map";

import ClientImageWithFallback from "@/components/Common/ClientImageWithFallback";
import { Package } from "@/types/package";

const PackageCard = ({
  packages,
  mediaStartURL,
}: {
  packages: Package[];
  mediaStartURL: string | any;
}) => {
  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <section className="dark:bg-darkmode">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-[40px] leading-[3rem] text-midnight_text dark:text-white font-bold text-center mb-10">
          Related Tours
        </h2>
        <Slider {...settings}>
          {packages.map((item, index) => (
            <Link
              key={index}
              href={`/tours/${item?.id}`}
              className="group px-4"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <ClientImageWithFallback
                  src={`${mediaStartURL}/${item?.gallery[0]?.url}`}
                  alt={item?.title}
                  className="group-hover:scale-110 group-hover:cursor-pointer transition-all duration-500"
                  width={408}
                  height={272}
                  style={{ width: "100%", height: "250px" }}
                  quality={100}
                  fallbackSrc="/images/default/no-blog-cover.avif"
                />

                <div className="absolute top-3 right-3 rounded-full py-1 px-4 bg-primary">
                  <p className="text-white font-medium text-sm">
                    {getSymbolFromCurrency(item?.pricing?.currency || "USD")}
                    {item?.pricing?.basePrice}
                  </p>
                </div>
              </div>
              <div className="ms-4 mt-6">
                <p className="text-base text-grey mb-2">
                  {item?.duration?.nights} Nights / {item?.duration?.days} Days
                </p>
                <h4 className="text-midnight_text text-2xl group-hover:text-primary dark:text-white">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-sm text-grey">
                    {getPackageStatus(item?.averageRating?.average || 0)}
                  </p>
                  <div>{renderStars(item?.averageRating?.average || 0)}</div>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
        <div className="text-center mt-10">
          <Link
            href="/tours"
            className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PackageCard;
const getPackageStatus = (level: number) => {
  switch (level) {
    case 1:
      return "Basic";
    case 2:
      return "Standard";
    case 3:
      return "Good";
    case 4:
      return "Very Good";
    case 5:
      return "Excellent";
    default:
      return "No Ratings";
  }
};
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {/* Full stars */}
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={index}
            className="w-5 h-5 text-yellow"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l2.39 7.27L22 9.27l-5.5 4.21L17.18 22 12 17.27 6.82 22l.68-8.52L2 9.27l7.61-1L12 2z" />
          </svg>
        ))}
      {/* Half star */}
      {halfStar && (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="halfStarGradient"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            >
              <stop offset="50%" stopColor="#f9c78f" />
              <stop offset="100%" stopColor="#668199" />
            </linearGradient>
            <clipPath id="halfStarClip">
              <rect x="0" y="0" width="18" height="36" />
            </clipPath>
          </defs>
          <path
            d="M34,16.78a2.22,2.22,0,0,0-1.29-4l-9-.34a.23.23,0,0,1-.2-.15L20.4,3.89a2.22,2.22,0,0,0-4.17,0l-3.1,8.43a.23.23,0,0,1-.2.15l-9,.34a2.22,2.22,0,0,0-1.29,4l7.06,5.55a.23.23,0,0,1,.08.24L7.35,31.21a2.22,2.22,0,0,0,3.38,2.45l7.46-5a.22.22,0,0,1,.25,0l7.46,5a2.2,2.2,0,0,0,2.55,0,2.2,2.2,0,0,0,.83-2.4l-2.45-8.64a.22.22,0,0,1,.08-.24ZM24.9,23.11l2.45,8.64A.22.22,0,0,1,27,32l-7.46-5a2.21,2.21,0,0,0-1.24-.38h0V4.44h0a.2.2,0,0,1,.21.15L21.62,13a2.22,2.22,0,0,0,2,1.46l9,.34a.22.22,0,0,1,.13.4l-7.06,5.55A2.21,2.21,0,0,0,24.9,23.11Z"
            fill="url(#halfStarGradient)"
            clipPath="url(#halfStarClip)"
          />
        </svg>
      )}
      {/* Empty stars */}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={index}
            className="w-5 h-5 text-border"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l2.39 7.27L22 9.27l-5.5 4.21L17.18 22 12 17.27 6.82 22l.68-8.52L2 9.27l7.61-1L12 2z" />
          </svg>
        ))}
    </div>
  );
};
