// components/RiskPools.jsx

const RiskPools = () => {
  return (
    <section className="py-16 px-6 bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Risk Pools Overview
      </h2>
      {/* <div className="grid gap-6 md:grid-cols-3">
        {pools.map((pool, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold">{pool.name}</h3>
            <p>Coverage: {pool.coverage}</p>
            <p>Risk: {pool.risk}</p>
            <p>APY: {pool.apy}</p>
            <button className="mt-4 px-4 py-2 bg-teal-500 rounded-md hover:bg-teal-600">
              Explore Pool
            </button>
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default RiskPools;
