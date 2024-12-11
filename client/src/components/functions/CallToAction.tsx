// components/CallToAction.jsx

const CallToAction = () => {
  return (
    <section className="py-16 bg-teal-700 text-center">
      <h2 className="text-3xl font-bold mb-6">Ready to Start?</h2>
      <div className="flex justify-center gap-6">
        <button className="px-6 py-3 bg-white text-teal-700 font-bold rounded-md hover:bg-gray-100">
          Join as a Liquidity Provider
        </button>
        <button className="px-6 py-3 bg-teal-800 text-white font-bold rounded-md hover:bg-teal-900">
          Explore Policies
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
