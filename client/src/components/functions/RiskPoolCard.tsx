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
import Pool, { LiquidityProvider } from "@/components/interfaces/Pool";
import { useAccount, useReadContract } from "wagmi";
import { PoolContract } from "@/components/interfaces/Pool";
import { useState, useEffect } from "react";
import contractAbi, { contractAddress } from "@/abi";
import { formatEther } from "viem";
import Details from "./Details";
import ClaimRewards from "./ClaimRewards";

interface RiskPoolCardProps {
  pool: Pool;
}

const levels = ["Low", "Medium", "High"];

export default function RiskPoolCard(pool: RiskPoolCardProps) {
  const { riskLevel, icon: Icon, color, features, rewardSystem } = pool.pool;

  const [poolData, setPoolData] = useState<PoolContract>({} as PoolContract);

  const { address } = useAccount();

  const riskLevelIndex = levels.indexOf(riskLevel);
  if (riskLevelIndex === -1) {
    throw new Error(`Invalid risk level: ${riskLevel}`);
  }

  const [providerData, setProviderData] = useState<LiquidityProvider>(
    {} as LiquidityProvider
  );

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

  console.log(riskLevelIndex, data, poolData);

  return (
    <>
      {address ? (
        Number(poolData.expiry) ? (
          <Card className={`${color} border-2 m-3`}>
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
                  ? (Number(poolData.totalFunds) / 10 ** 18).toFixed(2)
                  : "0"}{" "}
                MNT
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
                  {poolData.cap ? formatEther(BigInt(poolData.cap)) : "0"} MNT
                </p>
                {/* <p>
                  <strong className="font-bold">Rewards available:</strong>{" "}
                  {poolData.rewards
                    ? Math.round(Number(formatEther(BigInt(poolData.rewards))))
                    : "0"}{" "}
                  MNT
                </p> */}
                {address && (
                  <Details
                    riskLevel={riskLevelIndex}
                    address={address}
                    providerData={providerData}
                    setProviderData={setProviderData}
                  />
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
              {address && (
                <ClaimRewards
                  pool={poolData}
                  riskLevelValue={riskLevelIndex}
                  provider={providerData}
                />
              )}
            </CardFooter>
          </Card>
        ) : (
          <div className="text-center text-2xl font-bold text-text">
            Loading pool data...
          </div>
        )
      ) : (
        <div className="text-center text-2xl font-bold text-text">
          Please connect your wallet to view Risk Pools
        </div>
      )}
    </>
  );
}
