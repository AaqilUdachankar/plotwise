import { useEffect } from "react";
import Hero from "../components/Hero";
import PopularCities from "../components/PopularCities";

export default function Home() {
  useEffect(() => {
    document.title = "PlotWise AI | AI-Based Real Estate Investment Insights";
  }, []);

  return (
    <div>
      <Hero />
      <section className="py-16">
        <PopularCities />
      </section>
    </div>
  );
}
