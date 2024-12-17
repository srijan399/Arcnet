import { Button } from "../ui/button";
import { LiquidityProvider, PoolContract } from "../interfaces/Pool";
import { useWriteContract } from "wagmi";
import contractAbi, { contractAddress } from "@/abi";
import { useState } from "react";

export default function ClaimRewards(props: {
  pool: PoolContract;
  riskLevelValue: number;
  provider: LiquidityProvider;
}) {
  const { writeContractAsync } = useWriteContract();
  const [transactionStatus, setTransactionStatus] = useState<string | null>(
    null
  );
  const [transactionHash, setTransactionHash] = useState<string | undefined>(
    undefined
  );

  const { provider, riskLevelValue, pool } = props;
  async function handleRewards() {
    console.log("Claiming rewards");
    console.log(
      "Your reward: ",
      (Number(provider.amountStaked) * Number(pool.rewards)) /
        Number(pool.totalFunds) /
        10 ** 18
    );
    console.log("Risk Level: ", props.riskLevelValue);

    // Call the smart contract function to claim rewards
    try {
      const tx = await writeContractAsync(
        {
          address: contractAddress,
          abi: contractAbi,
          functionName: "claimRewards",
          args: [riskLevelValue],
        },
        {
          onSuccess(data: any) {
            console.log("Transaction successful!", data);
            setTransactionStatus("Transaction submitted!");
            setTransactionHash(data?.hash);
          },
          onError(error: any) {
            console.error("Error submitting transaction:", error);
            setTransactionStatus("Transaction failed.");
          },
          onSettled(data: any, error: any) {
            if (error) {
              setTransactionStatus("Transaction failed.");
              console.error("Error on settlement:", error);
            } else {
              console.log("Transaction settled:", data);
              setTransactionStatus("Transaction confirmed!");
              setTransactionHash(data?.hash);
            }
          },
        }
      );
      if (tx) {
        console.log("Transaction hash:", tx);
        setTransactionHash(tx);
        setTransactionStatus("Transaction confirmed!");
      }
    } catch (error) {
      console.error("Error submitting transaction:", error);
      setTransactionStatus("Transaction failed.");
    }
  }

  return (
    <Button
      variant="outline"
      className="w-full text-text hover:text-black"
      onClick={handleRewards}
    >
      Claim Rewards
    </Button>
  );
}
