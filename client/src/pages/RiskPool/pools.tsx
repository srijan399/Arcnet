import { TrendingDown, Shield, AlertTriangle } from "lucide-react";

export const riskPoolsList = [
  {
    riskLevel: "Low",
    icon: TrendingDown,
    color: "bg-green-100 border-green-500 text-green-700",
    features: [
      "Stable, predictable returns",
      "Minimal risk exposure",
      "Suitable for conservative investors",
    ],
    rewardSystem: "Variable weekly rewards",
  },
  {
    riskLevel: "Medium",
    icon: Shield,
    color: "bg-yellow-100 border-yellow-500 text-yellow-700",
    features: [
      "Balanced risk-reward profile",
      "Moderate market exposure",
      "Ideal for growth-oriented investors",
    ],
    rewardSystem: "Variable weekly rewards",
  },
  {
    riskLevel: "High",
    icon: AlertTriangle,
    color: "bg-red-100 border-red-500 text-red-700",
    features: [
      "Potential for high returns",
      "Significant market volatility",
      "For experienced, risk-tolerant investors",
    ],
    rewardSystem: "Variable weekly rewards",
  },
];
