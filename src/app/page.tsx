import BackgroundLayers from "@/components/BackgroundLayers";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ReleasesList from "@/components/ReleasesList";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <BackgroundLayers />
      <Header />

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <HeroSection />
        <ReleasesList />
      </main>

      <Footer />
    </>
  );
}
