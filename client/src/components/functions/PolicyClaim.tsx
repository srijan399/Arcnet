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

export default function PolicyClaimForm() {
  const form = useForm<PolicyClaimFormValues>({
    resolver: zodResolver(policyClaimSchema),
    defaultValues: {
      claimAmount: 0,
      reason: "",
    },
  });

  const onSubmit = (data: PolicyClaimFormValues) => {
    console.log("Claim Form Submitted:", data);
    // Handle claim submission (e.g., call smart contract function)
  };

  return (
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
  );
}
