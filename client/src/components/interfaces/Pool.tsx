export default interface Pool {
  riskLevel: string;
  icon: any;
  color: string;
  features: string[];
  rewardSystem: string;
}

export interface PoolContract {
  totalFunds: number;
  rewards: number;
  cap: number;
  expiry: number;
}

export interface LiquidityProvider {
  amountStaked: number;
  rewardsEarned: number;
}
