import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Pool from "../interfaces/Pool";
import { useWriteContract } from "wagmi";
import contractAbi, { contractAddress } from "@/abi";
import { useState } from "react";
import { parseEther } from "viem";

const formSchema = z.object({
  fund: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Fund must be a number",
    })
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Fund must be greater than 0",
    }),
  riskLevel: z.string(),
});

export default function FundForm(pool: Pool) {
  const { riskLevel } = pool;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fund: 0,
      riskLevel: riskLevel,
    },
  });

  const riskLevelMap = {
    Low: 0,
    Medium: 1,
    High: 2,
  };

  const [transactionStatus, setTransactionStatus] = useState<string | null>(
    null
  );
  const [transactionHash, setTransactionHash] = useState<string | undefined>(
    undefined
  );

  const { status, writeContractAsync, isPending } = useWriteContract();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form Submission Data:", data);

    setTransactionStatus("Submitting...");
    setTransactionHash(undefined);

    // Call the smart contract
    const { fund, riskLevel } = data;
    const riskLevelValue = riskLevelMap[riskLevel as keyof typeof riskLevelMap];

    try {
      const tx = await writeContractAsync(
        {
          address: contractAddress,
          abi: contractAbi,
          functionName: "addLiquidity",
          args: [riskLevelValue],
          value: parseEther(fund.toString()),
        },
        {
          onSuccess(data: any) {
            console.log("Transaction successful!", data);
            setTransactionStatus("Transaction submitted!");
            setTransactionHash(data?.hash);
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
    form.reset();
  }

  return (
    <DialogContent className="sm:max-w-[425px] text-text font-robomon">
      <DialogHeader>
        <DialogTitle className="text-center text-2xl">
          Purchase Policy
        </DialogTitle>
        <DialogDescription className="text-center">
          Make sure to have read the terms and conditions before purchasing.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl">Risk Level: {riskLevel}</h2>
          </div>
          {/* Coverage Field */}
          <FormField
            control={form.control}
            name="fund"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fund Amount (in ETH)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="10 ETH" {...field} />
                </FormControl>
                <FormDescription>
                  Coverage must be between less than Pool Cap
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <Input
            type="hidden"
            value={riskLevel}
            {...form.register("riskLevel")}
          />
          <div className="flex justify-between">
            <Button
              type="submit"
              className="text-text bg-red-950 outline-double"
              onCanPlay={() => form.handleSubmit(onSubmit)}
            >
              Add Funds
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
