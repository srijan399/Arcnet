export default interface Pool {
  riskLevel: string;
  icon: any;
  color: string;
  features: string[];
  rewardSystem: string;
}

export interface PoolContract {
  fund: number;
}
