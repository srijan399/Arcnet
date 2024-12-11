import ShimmerButton from "../ui/shimmer-button";

// components/Hero.jsx
const Hero = () => {
  return (
    <header className="h-screen flex flex-col justify-center items-center text-center px-6 space-y-8 overflow-hidden">
      {/* <Meteors number={20} /> */}
      <h1 className="text-5xl font-bold">Revolutionize Risk with Arcnet</h1>
      <p className="text-lg max-w-3xl">
        Secure your assets, grow your investments, and unlock the future of
        decentralized coverage.
      </p>
      <ShimmerButton className="w-[20%] font-bold">Get Started</ShimmerButton>
    </header>
  );
};

export default Hero;
