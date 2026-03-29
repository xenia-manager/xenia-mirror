import HeroSection from "@/components/HeroSection";
import ReleasesList from "@/components/ReleasesList";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <HeroSection />
        <ReleasesList />
      </div>
      <Footer />
    </>
  );
}
