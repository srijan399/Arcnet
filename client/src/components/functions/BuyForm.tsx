import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
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
import Policy from "../interfaces/Policy";
import { useWriteContract } from "wagmi";
import contractAbi, { contractAddress } from "@/abi";
import { useState } from "react";
import { parseEther } from "viem";

interface PolicyCardProps {
  policy: Policy;
}

const formSchema = z.object({
  coverage: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Coverage must be a number",
    })
    .transform((val) => Number(val))
    .refine((val) => val >= 5 && val <= 20, {
      message: "Coverage must be between 5 ETH and 20 ETH.",
    }),

  duration: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Duration must be a number",
    })
    .transform((val) => Number(val))
    .refine((val) => val >= 3 && val <= 6, {
      message: "Duration must be between 3 and 6 months.",
    }),

  title: z.string(), // Derived from policy prop, not user input
  description: z.string(), // Derived from policy prop, not user input
  riskLevel: z.union([
    z.literal("High"),
    z.literal("Medium"),
    z.literal("Low"),
  ]),
});

function BuyForm({ policy }: PolicyCardProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coverage: 0, // Default value for coverage
      duration: 0, // Default value for duration
      title: policy.title, // Set title from the policy prop
      description: policy.description, // Set description from the policy prop
      riskLevel: policy.riskLevel, // Set risk level from the policy prop
      // riskNumber: policy.riskNumber, // Set risk number from the policy prop
    },
  });

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
    let { coverage, duration } = data;
    duration = duration * 30 * 24 * 60 * 60; // Convert months to seconds
    const riskFactor = policy.riskNumber;
    const premium = calcPremium();

    try {
      const tx = await writeContractAsync(
        {
          address: contractAddress,
          abi: contractAbi,
          functionName: "purchasePolicy",
          args: [parseEther(coverage.toString()), duration, riskFactor],
          value: parseEther(premium.toString()),
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

  function calcPremium() {
    const { coverage, duration } = form.getValues();
    const premium = (coverage * duration * policy.riskNumber) / (12 * 3);
    console.log(`Your One Time premium is ${premium} ETH`);
    return premium;
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
          {/* Display Title, Risk Level, and Description */}
          <div className=" text-primary">
            <div>
              <strong className="font-bold text-lg">Title:</strong>{" "}
              {policy.title}
            </div>
            <div>
              <strong className="font-bold text-lg">Risk Level:</strong>{" "}
              {policy.riskLevel}
            </div>
            <div>
              <strong className="font-bold text-lg">Description:</strong>{" "}
              {policy.description}
            </div>
            {/* <div>
              <strong className="font-bold text-lg">Risk Factor:</strong>{" "}
              {policy.riskNumber}
            </div> */}
          </div>

          {/* Coverage Field */}
          <FormField
            control={form.control}
            name="coverage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coverage (in ETH)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Coverage" {...field} />
                </FormControl>
                <FormDescription>
                  Coverage must be between 5-20 ETH.
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Duration Field */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (in months)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Duration" {...field} />
                </FormControl>
                <FormDescription>
                  Duration must be between 3-6 months.
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          {/* Hidden Inputs for Title, Risk Level, and Description */}
          <input
            type="hidden"
            {...form.register("title")}
            value={policy.title}
          />
          <input
            type="hidden"
            {...form.register("description")}
            value={policy.description}
          />
          <input
            type="hidden"
            {...form.register("riskLevel")}
            value={policy.riskLevel}
          />
          {/* <input
            type="hidden"
            {...form.register("riskNumber")}
            value={policy.riskNumber}
          /> */}
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={calcPremium}
              className="text-text bg-red-950 outline-double"
            >
              Calculate Premium
            </Button>
            <Button
              type="submit"
              className="text-text bg-red-950 outline-double"
            >
              Get Policy
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}

export default BuyForm;
