import Navbar from "@/components/functions/Navbar";
import Hero from "@/components/functions/HeroSection";
import CallToAction from "@/components/functions/CallToAction";
import Footer from "@/components/functions/Footer";
import Meteors from "@/components/ui/meteors";

function Landing() {
  return (
    <div className="text-text bg-background min-h-screen">
      <Meteors number={35} />
      <Navbar />
      <Hero />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default Landing;
