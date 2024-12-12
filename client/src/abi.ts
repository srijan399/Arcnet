const contractAbi = [
  [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "policyholder",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "policyId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "ClaimApproved",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "policyholder",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "policyId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "ClaimFiled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "provider",
          type: "address",
        },
        {
          indexed: false,
          internalType: "enum Insure.RiskLevel",
          name: "riskLevel",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "LiquidityAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "policyholder",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "policyId",
          type: "uint256",
        },
      ],
      name: "PolicyPurchased",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "enum Insure.RiskLevel",
          name: "riskLevel",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "totalRewards",
          type: "uint256",
        },
      ],
      name: "RewardsDistributed",
      type: "event",
    },
    {
      inputs: [],
      name: "HIGH_COVERAGE",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "HIGH_PREMIUM",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "LOW_COVERAGE",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "LOW_PREMIUM",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MEDIUM_COVERAGE",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MEDIUM_PREMIUM",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "REWARD_INTERVAL",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "enum Insure.RiskLevel",
          name: "riskLevel",
          type: "uint8",
        },
      ],
      name: "addLiquidity",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "enum Insure.RiskLevel",
          name: "riskLevel",
          type: "uint8",
        },
      ],
      name: "distributeRewards",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "policyId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "claimAmount",
          type: "uint256",
        },
      ],
      name: "fileClaim",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "enum Insure.RiskLevel",
          name: "",
          type: "uint8",
        },
      ],
      name: "liquidityProviders",
      outputs: [
        {
          internalType: "uint256",
          name: "amountStaked",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "rewardsEarned",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "policies",
      outputs: [
        {
          internalType: "address",
          name: "policyholder",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "coverage",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "premium",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "duration",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "expiry",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "claimed",
          type: "bool",
        },
        {
          internalType: "uint8",
          name: "riskLevel",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "enum Insure.RiskLevel",
          name: "",
          type: "uint8",
        },
      ],
      name: "pools",
      outputs: [
        {
          internalType: "uint256",
          name: "totalFunds",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "rewards",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "cap",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "expiry",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "riskLevel",
          type: "uint8",
        },
        {
          internalType: "uint256",
          name: "duration",
          type: "uint256",
        },
      ],
      name: "purchasePolicy",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ],
];

export default contractAbi;

const contractAddress = "0x65d317bCA1f217E76660b891f28a217dE2c42De6";
export { contractAddress };
