import ShimmerButton from "../../ui/shimmer-button";
import TypingAnimation from "../../ui/typing-animation";
import { useNavigate } from "react-router-dom";

// components/Hero.jsx
const Hero = () => {
  const Navigate = useNavigate();
  return (
    <header className="h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 space-y-6 sm:space-y-9 overflow-hidden">
      <div className="text-4xl sm:text-6xl md:text-7xl font-bold font-montser text-text leading-tight">
        Revolutionize Risk with{" "}
        <TypingAnimation
          text="Arcnet"
          duration={500}
          className="font-bold text-accent text-5xl sm:text-7xl md:text-8xl"
        />
      </div>
      <p className="text-base sm:text-lg md:text-xl max-w-md sm:max-w-2xl font-robomon leading-relaxed px-2">
        Secure your assets, grow your investments, and unlock the future of
        decentralized loss coverage with your own short-term insurance buddy
      </p>
      <ShimmerButton
        className="w-full sm:w-1/2 md:w-[20%] py-3 sm:py-2 font-bold bg-accent text-text"
        onClick={() => Navigate("/policy")}
      >
        Get Started
      </ShimmerButton>
    </header>
  );
};

export default Hero;
