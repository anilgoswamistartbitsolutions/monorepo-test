import Image from "next/image";
import { Destination as DestinationType } from "@/types/destination";
import qs from "qs";
import DestinationCard from "@/components/SharedComponent/Destination/destinationCard";

async function fetchDestinations(): Promise<DestinationType[]> {
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
const Destination = async () => {
  const filteredDestinations = await fetchDestinations();
  return (
    <section className={`dark:bg-darkmode `} id="destination">
      <div className="container mx-auto max-w-6xl lg:px-0 px-4">
        <h2 className="text-[40px] leading-[3rem] text-midnight_text dark:text-white font-bold mb-9">
          Top Destinations
        </h2>
        <div className="grid grid-cols-12 gap-7">
          <div
            className="lg:col-span-6 col-span-12 rounded-3xl overflow-hidden group relative"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            <Image
              src="/images/destination/destinations-1.jpg"
              alt="..."
              width={500}
              height={0}
              style={{ width: "100%", height: "100%" }}
              className="group-hover:scale-110 duration-300"
            />
            <div className="p-8 sm:ps-8 ps-4 absolute bottom-0 left-0">
              <h4 className="text-white dark:text-white sm:text-2xl text-xl mb-2">
                Hiking Adventure
              </h4>
              <p className="text-white sm:text-lg text-base">
                306 Destinations
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12 flex flex-col gap-7">
            <div
              className="relative rounded-3xl overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              <Image
                src="/images/destination/destinations-2.jpg"
                alt="..."
                width={500}
                height={0}
                style={{ width: "100%", height: "auto" }}
                className="group-hover:scale-110 duration-300"
              />
              <div className="p-8 sm:ps-8 ps-4 absolute bottom-0 left-0">
                <h4 className="text-white dark:text-white sm:text-2xl text-xl mb-2">
                  Outdoor Adventure
                </h4>
                <p className="text-white sm:text-lg text-base">
                  418 Destinations
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-7">
              <div
                className="relative rounded-3xl overflow-hidden group"
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="1000"
              >
                <Image
                  src="/images/destination/destinations-3.jpg"
                  alt=".."
                  width={200}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                  className="group-hover:scale-110 duration-300"
                />
                <div className="sm:p-8 p-4 absolute bottom-0 left-0">
                  <h4 className="text-white dark:text-white sm:text-2xl text-xl mb-2">
                    Beach Adventure
                  </h4>
                  <p className="text-white sm:text-lg text-base">
                    85 Destinations
                  </p>
                </div>
              </div>
              <div
                className="relative rounded-3xl overflow-hidden group"
                data-aos-delay="300"
                data-aos-duration="1000"
              >
                <Image
                  src="/images/destination/destinations-4.jpg"
                  alt=".."
                  width={200}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                  className="group-hover:scale-110 duration-300"
                />
                <div className="sm:p-8 p-4 absolute bottom-0 left-0">
                  <h4 className="text-white dark:text-white sm:text-2xl text-xl mb-2">
                    Pilgrimage Destination
                  </h4>
                  <p className="text-white sm:text-lg text-base">
                    29 Destinations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <button className="text-primary border border-primary px-4 py-2 rounded-lg w-fit mx-auto hover:text-white hover:bg-primary">
            View More
          </button>
        </div>
      </div>

      <br />
      <div className="container mx-auto max-w-6xl lg:px-0 px-4">
        <div className="grid grid-cols-12 gap-7">
          {filteredDestinations.map((destination, i) => (
            <div
              key={i}
              className="w-full lg:col-span-4 md:col-span-6 col-span-12"
            >
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destination;
