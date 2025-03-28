# Arcnet - Your short term onchain insurance buddy!

(Deployed on Linea Sepolia Test Network at address 0x47B6DcD48414B9c4B42311DaB05DF17E9827Dd3b)

[Linea Explorer Link](https://sepolia.lineascan.build/address/0x47B6DcD48414B9c4B42311DaB05DF17E9827Dd3b) &
[Deployed Link](https://arcnet-delta.vercel.app)

## What Arcnet does:

### Policy Management

• Policy Purchase: Users can purchase insurance policies with customizable coverage, duration, and risk levels.
• Policy Expiry Tracking: Each policy has an automatically calculated expiry date.
• Policy Details: Policies store details like the policyholder, premium paid, coverage amount, risk level, and status (claimed or not).

### Claims Management

• File Claims: Policyholders can file claims if the policy is valid and unclaimed.
• Claim Validation: Automated checks ensure the policy is active, the claim amount is within coverage, and the pool has sufficient funds.
• Claim Approval and Payment: Approved claims are paid out directly to the policyholder's wallet.

### Liquidity Management

• Liquidity Providers: Allows users to stake funds in risk pools for earning rewards.
• Staked Funds Tracking: Each liquidity provider's staked amount is tracked per risk level.
• Rewards Distribution: Periodic distribution of rewards to liquidity providers proportional to their staked amount.
• Risk-Based Pools: Separate liquidity pools for Low, Medium, and High-risk policies with configurable caps and expiry dates.

### Risk-Based Features

• Risk Levels: Policies and liquidity pools are categorized into Low, Medium, and High risk.
• Dynamic Pool Management: Risk pools are managed independently, ensuring appropriate fund allocation for each risk level.
