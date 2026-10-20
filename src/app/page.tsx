import { Hero } from "@/components/home/Hero";
import { Location } from "@/components/home/Location";
import { Reviews } from "@/components/home/Reviews";
import { ServicesList } from "@/components/home/ServicesList";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesList />
      <Reviews />
      <Location />
    </>
  );
}
