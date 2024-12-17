// components/CallToAction.jsx

import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { CoolMode } from "../ui/cool-mode";

const CallToAction = () => {
  return (
    <section className="pb-10 px-6 sm:px-10 md:px-28 text-text font-robomon bg-background text-center flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-0">
      <div className="flex flex-col justify-center items-center md:items-start">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-snug">
          Ready to Start?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 sm:gap-3">
          <CoolMode>
            <Link to="risk-pool">
              <Button className="w-full sm:w-auto px-6 py-4 sm:py-5 bg-white text-teal-700 font-bold rounded-md hover:bg-gray-100">
                Join as a Liquidity Provider
              </Button>
            </Link>
          </CoolMode>
          <CoolMode>
            <Link to="/policy">
              <Button className="w-full sm:w-auto px-6 py-4 sm:py-5 bg-teal-800 text-text font-bold rounded-md hover:bg-teal-900">
                Explore Policies
              </Button>
            </Link>
          </CoolMode>
        </div>
      </div>
      <img
        src="/insure.jpg"
        alt="hero"
        className="w-full md:w-[50%] h-auto rounded-lg shadow-lg"
      />
    </section>
  );
};

export default CallToAction;
