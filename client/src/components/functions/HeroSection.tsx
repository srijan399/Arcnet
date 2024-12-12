import ShimmerButton from "../ui/shimmer-button";
import TypingAnimation from "../ui/typing-animation";
import { useNavigate } from "react-router-dom";

// components/Hero.jsx
const Hero = () => {
  const Navigate = useNavigate();
  return (
    <header className="h-screen flex flex-col justify-center items-center text-center px-6 space-y-9 overflow-hidden">
      {/* <Meteors number={20} /> */}
      <h1 className="text-7xl font-bold font-montser text-text">
        Revolutionize Risk with{" "}
        <TypingAnimation
          text="Arcnet"
          duration={500}
          className="font-bold text-accent text-8xl font-"
        />
      </h1>
      <p className="text-lg max-w-3xl font-robomon">
        Secure your assets, grow your investments, and unlock the future of
        decentralized coverage.
      </p>
      <ShimmerButton
        className="w-[20%] font-bold bg-accent text-text"
        onClick={() => Navigate("/policy")}
      >
        Get Started
      </ShimmerButton>
    </header>
  );
};

export default Hero;
