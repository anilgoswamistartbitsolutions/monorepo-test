import React from "react";
import HeroSub from "@/components/Package_Detail/herosub";
import Detail from "@/components/Package_Detail/Details";
import PackageSlider from "@/components/Package_Detail/slider";
import Journy from "@/components/SharedComponent/journyInfo";
import { Package as PackageType } from "@/types/package";
import getSymbolFromCurrency from "currency-symbol-map";
import qs from "qs";
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
async function fetchPackageDetails(
  packageId: string | any
): Promise<PackageType> {
  console.log("Fetching Tour package with ID:", packageId);
  const res = await fetch(
    `${process.env.PAYLOAD_CMS_API_URL}/tours/${packageId}?depth=2&draft=false&${query}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.PAYLOAD_CMS_API_KEY || ""}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch Tour package");
  }
  const data = await res.json();
  console.log("Fetched Tour package data:", data);
  return data;
}

async function fetchPackages(): Promise<PackageType[]> {
  const res = await fetch(`${process.env.PAYLOAD_CMS_API_URL}/tours?${query}`, {
    cache: "no-store", // or 'force-cache' if you want caching
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tours");
  }
  const data = await res.json();
  return data.docs || data;
}
export default async function Details({ params }: any) {
  const data = await params;
  const packageDetails = await fetchPackageDetails(data?.slug);
  const packages = await fetchPackages();

  return (
    <>
      <HeroSub
        duration={`${packageDetails?.duration?.nights} Nights / ${packageDetails?.duration?.days} Days`}
        title={packageDetails?.title}
        location={"USA"}
        review={getPackageStatus(packageDetails?.averageRating?.average || 0)}
        rating={packageDetails?.averageRating?.average || 0}
        price={`${getSymbolFromCurrency(
          packageDetails?.pricing?.currency || "USD"
        )}
                ${packageDetails?.pricing?.basePrice}`}
        maxGuests={packageDetails?.availability[0]?.maxPeople || 0}
      />
      <Detail
        content={packageDetails?.content}
        priceIncludes={packageDetails?.pricing?.priceIncludes || []}
        priceExcludes={packageDetails?.pricing?.priceExcludes || []}
        itinerary={packageDetails?.itinerary || []}
      />
      <PackageSlider
        packages={packages}
        mediaStartURL={process?.env?.PAYLOAD_CMS_MEDIA_URL}
      />
      <Journy />
    </>
  );
}

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
