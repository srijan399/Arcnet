import { motion } from "framer-motion";
import PolicyCard from "./PolicyCard";
import Navbar from "@/components/functions/Navbar";
import { policyList } from "./policies";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Policy from "@/components/interfaces/Policy";

const policies = policyList;

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4 flex mt-5 items-center px-6 justify-between"
      >
        <p className="text-xl text-gray-300  font-robomon">
          Protect your digital assets with our comprehensive coverage options
        </p>
        <Button className="bg-red-950 outline-double">
          <Link to="/buy">Your policies</Link>
        </Button>
      </motion.div>
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
