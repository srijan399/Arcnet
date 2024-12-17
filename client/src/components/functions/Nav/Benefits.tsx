// components/Benefits.jsx

const Benefits = () => {
  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Benefits</h2>
      <div className="flex flex-col md:flex-row md:justify-around gap-6">
        <div className="max-w-md text-center">
          <h3 className="text-xl font-bold">For Users</h3>
          <p>Protect your digital assets with tailored coverage plans.</p>
        </div>
        <div className="max-w-md text-center">
          <h3 className="text-xl font-bold">For Liquidity Providers</h3>
          <p>Earn attractive returns while supporting the DeFi ecosystem.</p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
