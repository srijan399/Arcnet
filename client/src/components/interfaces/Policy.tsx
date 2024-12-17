export default interface Policy {
  id: number;
  title: string;
  description: string;
  riskLevel: "High" | "Medium" | "Low";
  terms: {
    coverage: string;
    premiumRate: string;
    claimProcess: string;
    exclusions: string;
  };
  riskNumber: number;
}

export interface PolicyContract {
  policyId: string;
  policyholder: string;
  coverage: string;
  premium: string;
  duration: string;
  expiry: string;
  claimed: boolean;
  riskLevel: string;
  name: string;
}
