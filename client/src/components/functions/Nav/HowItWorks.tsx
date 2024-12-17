// components/RiskPools.jsx
import { Button } from "../../ui/button";
import Particles from "../../ui/particles";

const RiskPools = () => {
  const pools = [
    {
      name: "Crypto Exchange Pool",
      coverage: "$10M",
      risk: "Medium",
      apy: "8%",
    },
    { name: "Smart Contract Pool", coverage: "$5M", risk: "High", apy: "12%" },
    { name: "DeFi Pool", coverage: "$7M", risk: "Low", apy: "6%" },
  ];

  return (
    <section className="py-16 px-6 bg-gray-900">
      <div className="grid gap-8 md:grid-cols-3 ">
        {pools.map((pool, index) => (
          <div className="grid justify-between">
            <Particles quantity={100} refresh />
            <div
              key={index}
              className="bg-primary text-background rounded-full p-6 shadow-lg font-montser flex flex-col items-center w-[80%]"
            >
              <h3 className="text-xl font-bold">{pool.name}</h3>
              <p>Coverage: {pool.coverage}</p>
              <p>Risk: {pool.risk}</p>
              <p>APY: {pool.apy}</p>
              <Button className="mt-4 px-4 py-2 bg-teal-500 rounded-md hover:bg-teal-600">
                Explore Pool
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RiskPools;
