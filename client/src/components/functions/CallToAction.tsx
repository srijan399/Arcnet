// components/CallToAction.jsx

import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { CoolMode } from "../ui/cool-mode";

const CallToAction = () => {
  return (
    <section className="pb-10 px-28 text-text font-robomon bg-background text-center flex justify-between">
      <div className="flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start?</h2>
        <div className="flex justify-center gap-3">
          <CoolMode>
            <Link to="risk-pool">
              <Button className="px-6 py-5 bg-white text-teal-700 font-bold rounded-md hover:bg-gray-100">
                Join as a Liquidity Provider
              </Button>
            </Link>
          </CoolMode>
          <CoolMode>
            <Link to="/policy">
              <Button className="px-6 py-5 bg-teal-800 text-text font-bold rounded-md hover:bg-teal-900">
                Explore Policies
              </Button>
            </Link>
          </CoolMode>
        </div>
      </div>
      <img src="/insure.jpg" alt="hero" className="w-[50%] h-[40%]" />
    </section>
  );
};

export default CallToAction;
