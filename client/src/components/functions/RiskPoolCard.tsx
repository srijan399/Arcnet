import FundForm from "@/components/functions/FundForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Pool from "@/components/interfaces/Pool";
import { useAccount, useReadContract } from "wagmi";
import { PoolContract } from "@/components/interfaces/Pool";
import { useState, useEffect } from "react";
import contractAbi, { contractAddress } from "@/abi";
import { formatEther } from "viem";
import Details from "./Details";
import { Link } from "react-router-dom";

interface RiskPoolCardProps {
  pool: Pool;
}

const levels = ["Low", "Medium", "High"];

export default function RiskPoolCard(pool: RiskPoolCardProps) {
  const { riskLevel, icon: Icon, color, features, rewardSystem } = pool.pool;

  const [poolData, setPoolData] = useState<PoolContract>({} as PoolContract);

  const { address } = useAccount();
  console.log("Account: ", address);

  const riskLevelIndex = levels.indexOf(riskLevel);
  if (riskLevelIndex === -1) {
    throw new Error(`Invalid risk level: ${riskLevel}`);
  }

  const { data, refetch } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getPoolByRiskLevel",
    args: [BigInt(riskLevelIndex)],
  });

  useEffect(() => {
    console.log("Setting up refetch interval");
    const interval = setInterval(() => {
      refetch()
        .then((result: any) => {
          console.log("PoolData refetched: ", result.data);
          setPoolData(result.data as PoolContract);
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

  console.log(riskLevelIndex);

  return (
    <>
      {poolData.cap ? (
        <Card className={`${color} border-2`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-2xl">{riskLevel} Risk</span>
              <Icon className="w-8 h-8" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 mb-4">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p className="font-bold text-secondary">
              Current Pool Funds:{" "}
              {poolData.totalFunds
                ? formatEther(BigInt(poolData.totalFunds))
                : "0"}{" "}
              ETH
            </p>
            <p className="font-semibold">Reward System:</p>
            <p>{rewardSystem}</p>
            <p>
              <strong className="font-bold">Pool Expiry:</strong>{" "}
              {new Date(Number(poolData.expiry) * 1000).toLocaleDateString(
                "en-GB"
              )}
              <p>
                <strong className="font-bold">Pool Cap:</strong>{" "}
                {poolData.cap ? formatEther(BigInt(poolData.cap)) : "0"} ETH
              </p>
              {address && (
                <Details riskLevel={riskLevelIndex} address={address} />
              )}
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full text-black">Add Funds</Button>
              </DialogTrigger>
              <FundForm {...pool.pool} />
            </Dialog>
            <Button
              variant="outline"
              className="w-full text-text hover:text-black"
            >
              Claim Rewards
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="text-center text-2xl font-bold text-text">
          Loading pool data...
        </div>
      )}
    </>
  );
}