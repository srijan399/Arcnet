import Navbar from "../components/functions/Navbar";
import Hero from "../components/functions/HeroSection";
import HowItWorks from "../components/functions/HowItWorks";
import Benefits from "../components/functions/Benefits";
import CallToAction from "../components/functions/CallToAction";
import Footer from "../components/functions/Footer";

function App() {
  return (
    <div className="bg-gradient-to-br from-blue-900 via-teal-800 to-purple-900 text-white min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Benefits />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;
