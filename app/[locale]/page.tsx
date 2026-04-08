import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <main className="flex flex-1 w-full flex-col items-center justify-between bg-white dark:bg-black ">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <Footer />
    </main>
  );
}
