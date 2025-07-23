// "use client"
import { Package } from "@/app/api/data";
import qs from "qs";
interface Package {
  image: string;
  price: string;
  duration: {days: number; nights: number};
  title: string;
  description: string;
  review: string;
  rating: number;
  slug: string | any;
  sites: string[];
  seoDescription: string;
}

async function fetchPackages(): Promise<Package[]> {
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
  const res = await fetch(`${process.env.PAYLOAD_CMS_API_URL}/tours`, {
    cache: "no-store", // or 'force-cache' if you want caching
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tours");
  }
  const data = await res.json();
  return data.docs || data;
}

const PackageCard = async () => {
  const packages = await fetchPackages();

  const filteredPackages = packages;

  // Helper function to render stars
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
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
      {(filteredPackages ?? [])?.map((item, index) => (
        <div key={index}>
          <div className="ms-4 mt-6">
            <p className="text-base text-grey mb-2">
              {item?.duration?.days} days , {item?.duration?.nights} nights
            </p>
            <h4 className="text-midnight_text text-2xl group-hover:text-primary dark:text-white">
              {item?.title}
            </h4>

            <p className="text-small py-2">{item?.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-sm text-grey">{item?.review}</p>
              <div>{renderStars(5)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PackageCard;
