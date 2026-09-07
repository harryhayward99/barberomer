import { About } from "@/components/home/About";
import { Hero } from "@/components/home/Hero";
import { HoursStatus } from "@/components/home/HoursStatus";
import { Location } from "@/components/home/Location";
import { Reviews } from "@/components/home/Reviews";
import { ServicesList } from "@/components/home/ServicesList";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesList />
      <Reviews />
      <About />
      <HoursStatus />
      <Location />
    </>
  );
}
