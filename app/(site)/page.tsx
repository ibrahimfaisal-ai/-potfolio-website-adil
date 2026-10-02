import Hero from "@/src/components/Hero/Hero";
import dynamic from "next/dynamic";
import DeferredSections from "@/src/components/Home/DeferredSections";

const About = dynamic(() => import("@/src/components/About/About"));
const Services = dynamic(() => import("@/src/components/Services/Services"));
const Footer = dynamic(() => import("@/src/components/Footer/Footer"));

export default function Home({ initialSlug }: { initialSlug?: string }) {
  return (
    <main className="flex flex-col w-full relative overflow-clip">
      <Hero />
      <About />
      <Services />
      <DeferredSections initialSlug={initialSlug} />
      <Footer />
    </main>
  );
}
