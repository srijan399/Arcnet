import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PolicyCard from "./PolicyCard";
import Navbar from "@/components/functions/Navbar";
import { policyList } from "./policies";
import { Button } from "@/components/ui/button";
import Policy, { PolicyContract } from "@/components/interfaces/Policy";
import { useAccount, useReadContract } from "wagmi";
import contractAbi, { contractAddress } from "@/abi";

const policies = policyList;

export default function PoliciesPage() {
  // State to control the off-canvas visibility
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [myPolicies, setMyPolicies] = useState<PolicyContract[]>([]);
  const account = useAccount();

  // Toggle the off-canvas
  const toggleOffCanvas = () => {
    setIsOffCanvasOpen((prev) => !prev);
  };

  const { data, refetch } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getPoliciesByAddress",
    args: [account?.address],
  });

  useEffect(() => {
    console.log("Setting up refetch interval");

    const interval = setInterval(() => {
      refetch()
        .then((result: any) => {
          console.log("Data refetched: ", result);
          setMyPolicies(result.data as PolicyContract[]);
        })
        .catch((error: any) => {
          console.error("Error during refetch: ", error);
        });
    }, 5000);
    return () => {
      console.log("Clearing refetch interval");
      clearInterval(interval);
    };
  }, [refetch]);

  console.log("Data: ", data);

  const handleClaim = () => {
    console.log("Claim submitted successfully");
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4 flex mt-5 items-center px-6 justify-between"
      >
        <p className="text-xl text-gray-300 font-robomon">
          Protect your digital assets with our comprehensive coverage options
        </p>
        <Button className="bg-red-950 outline-double" onClick={toggleOffCanvas}>
          Your policies
        </Button>
      </motion.div>

      {/* Off-canvas panel */}
      <div
        className={`fixed top-0 right-0 w-1/3 h-full bg-background p-6 transition-transform duration-300 z-50 transform ${
          isOffCanvasOpen
            ? "translate-x-0 border-l-2 border-primary"
            : "translate-x-full"
        } font-robomon`}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={toggleOffCanvas}
        >
          X
        </button>
        <h2 className="text-white text-2xl mb-4">Your Policies</h2>
        <div className="space-y-4">
          {myPolicies.map((policy) => (
            <div
              key={policy.policyholder}
              className="bg-gray-800 p-4 rounded-lg shadow-md text-white"
            >
              <h3 className="text-lg font-bold">{policy.name}</h3>
              <p className="text-sm text-gray-300 mt-2">{policy.coverage}</p>
              <p className="text-sm text-gray-300 mt-2">{policy.premium}</p>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">Duration:</span>{" "}
                    {Number(policy.duration) / (60 * 60 * 24) / 30} months
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Expiry:</span>{" "}
                    {new Date(Number(policy.expiry) * 1000).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>
                </div>
                <button
                  onClick={() => handleClaim()}
                  className="bg-blue-600 hover:bg-blue-500 text-sm px-4 py-2 rounded-lg"
                >
                  Claim
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5 font-robomon"
      >
        {policies.map((policy) => (
          <PolicyCard key={policy.id} policy={policy as Policy} />
        ))}
      </motion.div>
    </div>
  );
}
