import React from "react";
import { Metadata } from "next";
import { Hero } from "@travel-platform/ui-components";
import Destination from "@/components/Home/Destinations";
import FeaturesSlider from "@/components/Home/Features";
import PackageSlider from "@/components/Home/PackagesSlide";
import Testimonials from "@/components/Home/Testimonial";
import Blog from "@/components/SharedComponent/Blog";
import JournyInfo from "@/components/SharedComponent/journyInfo";
import PopularCountries from "@/components/Home/Countries";

export const metadata: Metadata = {
  title: "Holiday Deals - Your Dream Vacation Awaits",
  description: "Discover amazing holiday deals and travel packages. Book your dream vacation today with exclusive offers on tours, hotels, and experiences worldwide.",
};

export default function Home() {
  return (
    <main>
      <Hero 
        title="HOLIDAY DEALS"
        subtitle="Discover Amazing Travel Deals & Packages"
        backgroundImage="/images/hero/travel-bg.jpg"
        price={{
          amount: 299,
          currency: "$",
          duration: "Flight + 3 Nights"
        }}
        searchForm={true}
        variant="default"
      />
      <Destination />
      <FeaturesSlider />
      <PackageSlider />
      <PopularCountries />
      <Testimonials />
      <Blog />
      <JournyInfo />
    </main>
  );
}
