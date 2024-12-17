import { useReadContract } from "wagmi";
import contractAbi, { contractAddress } from "@/abi";
import { useEffect, useState } from "react";
// import Navbar from "@/components/functions/Navbar";
import { LiquidityProvider } from "@/components/interfaces/Pool";
// import { formatEther } from "viem";

export default function Details(props: any) {
  const { data, refetch } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getLiquidityProviderDetails",
    args: [props.riskLevel, props.address], // Only pass the risk level now
  });

  // const [providerData, setProviderData] = useState<LiquidityProvider>(
  //   {} as LiquidityProvider
  // );

  const { providerData, setProviderData } = props;

  useEffect(() => {
    console.log("Setting up refetch interval");
    const interval = setInterval(() => {
      refetch()
        .then((result: any) => {
          console.log("Provider Data refetched: ", result.data);
          setProviderData(result.data as LiquidityProvider);
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

  // console.log(data);

  return (
    <>
      {providerData?.amountStaked !== undefined ? (
        <div>
          <p>
            <strong className="font-bold">Your staked amount:</strong>{" "}
            {Number(providerData.amountStaked) / 10 ** 18} ETH
          </p>
          <p>
            <strong className="font-bold">Rewards earned:</strong>{" "}
            {(Number(providerData.rewardsEarned) / 10 ** 18).toFixed(2)} MNT
          </p>
        </div>
      ) : (
        <div>User Details Loading...</div>
      )}
    </>
  );
}
