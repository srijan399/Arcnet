import Navbar from "@/components/functions/Navbar";
import RiskPoolCard from "@/pages/RiskPool/RiskPoolCard";
import { riskPoolsList } from "@/pages/RiskPool/pools";
import Pool from "@/components/interfaces/Pool";

export default function RiskPool() {
  const riskPools = riskPoolsList;
  return (
    <main className="min-h-screen bg-background text-text">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-9 font-robomon">
        <h1 className="text-4xl font-bold text-center text-text mb-12">
          Investment Risk Pools
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {riskPools.map((pool) => (
            <RiskPoolCard pool={pool as Pool} />
          ))}
        </div>
      </div>
    </main>
  );
}
