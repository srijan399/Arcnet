const contractAbi = [
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
      {
        internalType: "address",
        name: "_provider",
        type: "address",
      },
    ],
    name: "getLiquidityProviderDetails",
    outputs: [
      {
        components: [
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
        internalType: "struct Insure.LiquidityProvider",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_policyholder",
        type: "address",
      },
    ],
    name: "getPoliciesByAddress",
    outputs: [
      {
        components: [
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
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
        ],
        internalType: "struct Insure.Policy[]",
        name: "",
        type: "tuple[]",
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
    name: "getPoolByRiskLevel",
    outputs: [
      {
        components: [
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
        internalType: "struct Insure.Pool",
        name: "",
        type: "tuple",
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
      {
        internalType: "string",
        name: "name",
        type: "string",
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
        internalType: "uint256",
        name: "coverage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "riskNumber",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "purchasePolicy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export default contractAbi;

const contractAddress = "0x9f32bb7276AaEf947ae38046cf45343423fD370f";
export { contractAddress };
