// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedInsurance {
    // Structs
    struct Policy {
        address policyholder;
        uint256 coverage;
        uint256 premium;
        uint256 duration;
        uint256 expiry;
        bool claimed;
        uint8 riskLevel; // 1: Low, 2: Medium, 3: High
    }

    struct Pool {
        uint256 totalFunds;
        uint256 rewards;
        uint256 cap;
        uint256 expiry;
    }

    struct LiquidityProvider {
        uint256 amountStaked;
        uint256 rewardsEarned;
    }

    // Enums
    enum RiskLevel {
        Low,
        Medium,
        High
    }

    // Mappings
    mapping(address => Policy[]) public policies;
    mapping(address => mapping(RiskLevel => LiquidityProvider))
        public liquidityProviders;
    mapping(RiskLevel => Pool) public pools;

    // Events
    event PolicyPurchased(
        address indexed policyholder,
        uint256 indexed policyId
    );
    event LiquidityAdded(
        address indexed provider,
        RiskLevel riskLevel,
        uint256 amount
    );
    event ClaimFiled(
        address indexed policyholder,
        uint256 indexed policyId,
        uint256 amount
    );
    event ClaimApproved(
        address indexed policyholder,
        uint256 indexed policyId,
        uint256 amount
    );
    event RewardsDistributed(RiskLevel indexed riskLevel, uint256 totalRewards);

    // Constants
    uint256 public constant LOW_PREMIUM = 1 ether;
    uint256 public constant MEDIUM_PREMIUM = 3 ether;
    uint256 public constant HIGH_PREMIUM = 5 ether;

    uint256 public constant LOW_COVERAGE = 10 ether;
    uint256 public constant MEDIUM_COVERAGE = 30 ether;
    uint256 public constant HIGH_COVERAGE = 50 ether;

    uint256 public constant REWARD_INTERVAL = 1 weeks;

    // Constructor
    constructor() {
        pools[RiskLevel.Low] = Pool(
            0,
            0,
            100 ether,
            block.timestamp + 180 days
        );
        pools[RiskLevel.Medium] = Pool(
            0,
            0,
            200 ether,
            block.timestamp + 180 days
        );
        pools[RiskLevel.High] = Pool(
            0,
            0,
            300 ether,
            block.timestamp + 180 days
        );
    }

    // Modifiers
    modifier poolNotExpired(RiskLevel riskLevel) {
        require(block.timestamp < pools[riskLevel].expiry, "Pool expired");
        _;
    }

    modifier onlyPolicyHolder(uint256 policyId) {
        require(
            policies[msg.sender][policyId].policyholder == msg.sender,
            "Not policyholder"
        );
        _;
    }

    // Functions

    // Add liquidity to a pool
    function addLiquidity(
        RiskLevel riskLevel
    ) external payable poolNotExpired(riskLevel) {
        require(msg.value > 0, "Must send ETH");
        require(
            pools[riskLevel].totalFunds + msg.value <= pools[riskLevel].cap,
            "Exceeds pool cap"
        );

        liquidityProviders[msg.sender][riskLevel].amountStaked += msg.value;
        pools[riskLevel].totalFunds += msg.value;

        emit LiquidityAdded(msg.sender, riskLevel, msg.value);
    }

    // Purchase a policy
    function purchasePolicy(
        uint8 riskLevel,
        uint256 duration
    ) external payable {
        require(riskLevel >= 1 && riskLevel <= 3, "Invalid risk level");

        uint256 premium;
        uint256 coverage;
        if (riskLevel == 1) {
            premium = LOW_PREMIUM;
            coverage = LOW_COVERAGE;
        } else if (riskLevel == 2) {
            premium = MEDIUM_PREMIUM;
            coverage = MEDIUM_COVERAGE;
        } else {
            premium = HIGH_PREMIUM;
            coverage = HIGH_COVERAGE;
        }

        require(msg.value == premium, "Incorrect premium amount");

        RiskLevel risk = RiskLevel(riskLevel - 1);
        pools[risk].rewards += msg.value;

        policies[msg.sender].push(
            Policy({
                policyholder: msg.sender,
                coverage: coverage,
                premium: premium,
                duration: duration,
                expiry: block.timestamp + duration,
                claimed: false,
                riskLevel: uint8(risk)
            })
        );

        emit PolicyPurchased(msg.sender, policies[msg.sender].length - 1);
    }

    // File a claim
    function fileClaim(
        uint256 policyId,
        uint256 claimAmount
    ) external onlyPolicyHolder(policyId) {
        Policy storage policy = policies[msg.sender][policyId];
        require(block.timestamp < policy.expiry, "Policy expired");
        require(!policy.claimed, "Policy already claimed");
        require(claimAmount <= policy.coverage, "Claim exceeds coverage");

        RiskLevel risk = RiskLevel(policy.riskLevel);
        require(
            claimAmount <= pools[risk].totalFunds,
            "Insufficient pool funds"
        );

        policy.claimed = true;
        pools[risk].totalFunds -= claimAmount;
        payable(msg.sender).transfer(claimAmount);

        emit ClaimFiled(msg.sender, policyId, claimAmount);
        emit ClaimApproved(msg.sender, policyId, claimAmount);
    }

    // Distribute rewards to LPs
    function distributeRewards(
        RiskLevel riskLevel
    ) external poolNotExpired(riskLevel) {
        Pool storage pool = pools[riskLevel];
        uint256 totalRewards = pool.rewards;
        pool.rewards = 0;

        for (uint256 i = 0; i < address(this).balance; i++) {
            LiquidityProvider storage lp = liquidityProviders[msg.sender][
                riskLevel
            ];
            uint256 share = (lp.amountStaked * totalRewards) / pool.totalFunds;
            lp.rewardsEarned += share;
            payable(msg.sender).transfer(share);
        }

        emit RewardsDistributed(riskLevel, totalRewards);
    }
}
