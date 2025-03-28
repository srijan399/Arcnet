import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PolicyContract } from "@/components/interfaces/Policy";
import { useWriteContract } from "wagmi";
import contractAbi, { contractAddress } from "@/abi";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "sonner";
import { parseEther } from "viem";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Zod schema for form validation
const policyClaimSchema = z.object({
  claimAmount: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Claim Amount must be a number",
    })
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Claim Amount must be greater than 0",
    }),
  reason: z.string().min(10, "Reason must be at least 10 characters long"),
});

type PolicyClaimFormValues = z.infer<typeof policyClaimSchema>;

export default function PolicyClaimForm(props: { policy: PolicyContract }) {
  const form = useForm<PolicyClaimFormValues>({
    resolver: zodResolver(policyClaimSchema),
    defaultValues: {
      claimAmount: 0,
      reason: "",
    },
  });

  const { writeContractAsync } = useWriteContract();
  const [transactionStatus, setTransactionStatus] = useState<string | null>(
    null
  );
  const [transactionHash, setTransactionHash] = useState<string | undefined>(
    undefined
  );
  const policy = props.policy;

  async function onSubmit(data: PolicyClaimFormValues) {
    console.log("Claim Form Submitted:", data);
    // Handle claim submission (e.g., call smart contract function)
    const { claimAmount, reason } = data;
    console.log("Claim Amount:", claimAmount);
    try {
      const prompt = `
        There are six categories of Insurance services:
            1. Governance Attack Protection
            2. Exchange Hack Compensation
            3. DeFi Yield Farming Insurance
            4. Stablecoin Depeg Safety Net
            5. Crypto Rug Pull Protection
            6. Smart Contract Vulnerability Shield
            
        Now policy holder can claim their insurance with a reason. What I want you to do is return a boolean value: true or false when I send you the reason along with the policy name based on if the reason comes under the policy.

        Give me a boolean value true or false only. 

        ${reason} is the reason for the claim under ${policy.name} policy.
        `;

      const result = await model.generateContent(prompt);
      const responseText =
        result.response.candidates?.[0]?.content.parts[0].text;
      console.log("Generated response:", responseText);

      if (responseText?.toLowerCase().includes("true")) {
        console.log("Claim is valid. Filing claim...");
        toast.success("Claim is valid. Filing claim...");
      } else {
        console.log("Claim is invalid. Aborting claim...");
        return;
      }

      const tx = await writeContractAsync(
        {
          address: contractAddress,
          abi: contractAbi,
          functionName: "fileClaim",
          args: [policy.policyId, parseEther(claimAmount.toString()), reason],
        },
        {
          onSuccess(data: any) {
            console.log("Transaction successful!", data);
            setTransactionStatus("Transaction submitted!");
            setTransactionHash(data?.hash);
            console.log(transactionHash, transactionStatus);
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
    <>
      {policy.claimed ? (
        <Button className="bg-gray-400 text-xs md:text-sm px-3 py-2 rounded-lg cursor-not-allowed">
          Claimed
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-500 text-xs md:text-sm px-3 py-2 rounded-lg">
              Claim Policy
            </Button>
          </DialogTrigger>
          <DialogContent className="font-robomon text-text">
            <DialogHeader>
              <DialogTitle className="text-center text-3xl">
                Submit Policy Claim
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Claim Amount Field */}
                <FormField
                  control={form.control}
                  name="claimAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Claim Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter claim amount (MNT)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Reason Field */}
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Cite a reason for the claim"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full sm:w-auto text-text bg-red-950 outline-double px-3 py-2 text-sm"
                >
                  Submit Claim
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
