export const policyList = [
  {
    id: 1,
    title: "Crypto Rug Pull Protection",
    description:
      "Coverage against sudden project abandonment and token value collapse. Protects investors from losses when a project's development team withdraws funds and ceases operations unexpectedly.",
    riskLevel: "High" as "High" | "Medium" | "Low",
    terms: {
      coverage: "Up to 60 ETH",
      premiumRate: "1.5% of coverage per month",
      claimProcess:
        "Submit evidence of rug pull including blockchain transactions. Claim is subject to verification by the insurance team.",
      exclusions:
        "Projects flagged as suspicious prior to purchase, and claims made post-project recovery.",
    },
    riskNumber: 3,
  },
  {
    id: 2,
    title: "Smart Contract Vulnerability Shield",
    description:
      "Safeguard against exploits due to smart contract flaws. Covers losses caused by unintentional bugs or backdoors in audited smart contracts.",
    riskLevel: "Medium" as "High" | "Medium" | "Low",
    terms: {
      coverage: "Up to 40 ETH",
      premiumRate: "1% of coverage per month",
      claimProcess:
        "Submit exploit details including proof of the vulnerability and the resulting loss. Claims are subject to technical verification.",
      exclusions:
        "Contracts without audits or those flagged as high-risk prior to policy purchase.",
    },
    riskNumber: 2,
  },
  {
    id: 3,
    title: "Stablecoin Depeg Safety Net",
    description:
      "Protection from losses caused by stablecoin deviations. Ensures reimbursement when stablecoins lose their peg for a prolonged period.",
    riskLevel: "Low" as "High" | "Medium" | "Low",
    terms: {
      coverage: "Up to 20 ETH",
      premiumRate: "0.5% of coverage per month",
      claimProcess:
        "Provide market data showing prolonged depeg of more than 10% from the stablecoin's intended value over 72 hours.",
      exclusions:
        "Temporary depegging within 10% range, algorithmic stablecoins not backed by collateral.",
    },
    riskNumber: 1,
  },
  {
    id: 4,
    title: "DeFi Yield Farming Insurance",
    description:
      "Coverage for impermanent loss and farming strategy failures. Helps mitigate financial setbacks from yield farming risks in DeFi protocols.",
    riskLevel: "Medium" as "High" | "Medium" | "Low",
    terms: {
      coverage: "Up to 40 ETH",
      premiumRate: "1% of coverage per month",
      claimProcess:
        "Submit evidence of impermanent loss calculations or protocol failures affecting the staked funds.",
      exclusions:
        "High-risk protocols without prior audits or lack of staking records.",
    },
    riskNumber: 2,
  },
  {
    id: 5,
    title: "Exchange Hack Compensation",
    description:
      "Reimbursement for assets lost in centralized exchange breaches. Provides financial recovery for users affected by exchange security breaches.",
    riskLevel: "High" as "High" | "Medium" | "Low",
    terms: {
      coverage: "Up to 60 ETH",
      premiumRate: "1.5% of coverage per month",
      claimProcess:
        "Submit a claim with official exchange breach confirmation and proof of assets lost.",
      exclusions:
        "Unverified exchange accounts, negligence in enabling security features like 2FA.",
    },
    riskNumber: 3,
  },
  {
    id: 6,
    title: "Governance Attack Protection",
    description:
      "Safeguard against malicious takeovers in DAOs and protocols. Protects users from losses caused by manipulative or fraudulent governance votes.",
    riskLevel: "Medium",
    terms: {
      coverage: "Up to 40 ETH",
      premiumRate: "1% of coverage per month",
      claimProcess:
        "Provide evidence of governance manipulation including transaction logs and DAO records.",
      exclusions:
        "Votes carried out according to the DAO's bylaws, or lack of participation in governance by the policyholder.",
    },
    riskNumber: 2,
  },
];
