import { motion } from "framer-motion";
import { Shield, AlertTriangle, TrendingDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BuyForm from "@/components/functions/BuyForm";
import Policy from "@/components/interfaces/Policy";
import { useAccount } from "wagmi";

interface PolicyCardProps {
  policy: Policy;
}

const riskLevelConfig = {
  High: { color: "bg-red-500", icon: AlertTriangle },
  Medium: { color: "bg-yellow-500", icon: Shield },
  Low: { color: "bg-green-500", icon: TrendingDown },
};

export default function PolicyCard({ policy }: PolicyCardProps) {
  const { color, icon: Icon } = riskLevelConfig[policy.riskLevel];
  const account = useAccount();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      <div className="p-6 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold mr-1">{policy.title}</h2>
          <span
            className={`${color} text-white text-xs font-bold px-2 py-1 rounded-full flex items-center`}
          >
            <Icon size={20} className="mr-4" />
            {policy.riskLevel} Risk
          </span>
        </div>
        <div className="text-gray-300 mb-6">{policy.description}</div>
        <div className="flex justify-between items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 mr-2"
                aria-label={`View details for ${policy.title}`}
              >
                View Details
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-gray-900 text-white p-4 rounded-md shadow-md max-w-sm font-arimo font-">
              <h3 className="text-lg font-bold mb-2">{policy.title} - Terms</h3>
              <ul className="space-y-2">
                <li>
                  <strong>Coverage:</strong> {policy.terms.coverage}
                </li>
                <li>
                  <strong>Premium Rate:</strong> {policy.terms.premiumRate}
                </li>
                <li>
                  <strong>Claim Process:</strong> {policy.terms.claimProcess}
                </li>
                <li>
                  <strong>Exclusions:</strong> {policy.terms.exclusions}
                </li>
              </ul>
            </PopoverContent>
          </Popover>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                aria-label={`Purchase ${policy.title} policy`}
              >
                Purchase Policy
              </Button>
            </DialogTrigger>
            {account?.address ? (
              <BuyForm policy={policy} />
            ) : (
              <DialogContent className="bg-gray-900 text-white p-4 rounded-md shadow-md max-w-sm font-arimo">
                <h3 className="text-lg font-bold mb-2">
                  Please connect your account to purchase
                </h3>
                <p className="text-sm">
                  To purchase a policy, you must connect your account. Please
                  connect your account to proceed.
                </p>
              </DialogContent>
            )}
          </Dialog>
        </div>
      </div>
    </motion.div>
  );
}
