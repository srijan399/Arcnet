import Navbar from "@/components/functions/Navbar";
import Hero from "@/components/functions/Nav/HeroSection";
import CallToAction from "@/components/functions/Nav/CallToAction";
import Footer from "@/components/functions/Nav/Footer";
import Meteors from "@/components/ui/meteors";

function Landing() {
  return (
    <div className="text-text bg-background min-h-screen overflow-x-hidden">
      <Meteors number={35} />
      <Navbar />
      <Hero />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default Landing;
