import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PolicyCard from "../../components/functions/PolicyCard";
import Navbar from "@/components/functions/Navbar";
import { policyList } from "./policies";
import { Button } from "@/components/ui/button";
import Policy, { PolicyContract } from "@/components/interfaces/Policy";
import { useAccount, useReadContract } from "wagmi";
import contractAbi, { contractAddress } from "@/abi";
import PolicyClaimForm from "@/components/functions/PolicyClaim";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

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
          console.log("My policy Data refetched: ", result);
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
        className="text-center mb-4 flex flex-col md:flex-row mt-5 items-center px-4 md:px-6 justify-between space-y-4 md:space-y-0"
      >
        <p className="text-lg md:text-xl text-gray-300 font-robomon text-center md:text-left">
          Protect your digital assets with our comprehensive coverage options
        </p>
        <Button
          className="bg-red-950 outline-double w-full md:w-auto text-center"
          onClick={toggleOffCanvas}
        >
          Your policies
        </Button>
      </motion.div>

      {/* Off-canvas panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-background p-4 md:p-6 transition-transform duration-300 z-50 transform ${
          isOffCanvasOpen
            ? "translate-x-0 border-l-2 border-primary"
            : "translate-x-full"
        } font-robomon w-full md:w-1/2 lg:w-1/3`}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={toggleOffCanvas}
        >
          X
        </button>

        {/* Panel title */}
        <h2 className="text-white text-xl md:text-2xl mb-4">Your Policies</h2>

        {/* Policies container */}
        <div className="space-y-4 overflow-y-auto max-h-[90vh]">
          {myPolicies.length ? (
            myPolicies.map((policy) => (
              <div
                key={policy.policyholder}
                className="bg-gray-800 p-4 rounded-lg shadow-md text-white"
              >
                {/* Policy details */}
                <h3 className="text-base md:text-lg font-bold">
                  {policy.name}
                </h3>
                <p className="text-sm text-gray-300 mt-2">{policy.coverage}</p>
                <p className="text-sm text-gray-300 mt-2">{policy.premium}</p>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-xs md:text-sm">
                      <span className="font-semibold">Duration:</span>{" "}
                      {Number(policy.duration) / (60 * 60 * 24) / 30} months
                    </p>
                    <p className="text-xs md:text-sm">
                      <span className="font-semibold">Expiry:</span>{" "}
                      {new Date(
                        Number(policy.expiry) * 1000
                      ).toLocaleDateString("en-GB")}
                    </p>
                  </div>

                  {/* Claim button */}
                  {/* <Button
                    onClick={() => handleClaim()}
                    className="bg-blue-600 hover:bg-blue-500 text-xs md:text-sm px-3 py-2 rounded-lg"
                  >
                    Claim
                  </Button> */}
                  <PolicyClaimForm />
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No policies found</p>
          )}
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

// const policyClaimSchema = z.object({
//   policyId: z.string().min(1, "Policy ID is required"),
//   claimAmount: z.number().positive("Claim amount must be greater than zero"),
//   reason: z.string().min(10, "Reason must be at least 10 characters long"),
// });

// function ClaimForm() {}
