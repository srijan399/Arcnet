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
