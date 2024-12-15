// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lock {
    // Structs
    struct Policy {
        address policyholder;
        uint256 coverage;
        uint256 premium;
        uint256 duration;
        uint256 expiry;
        bool claimed;
        uint8 riskLevel;
        string name;
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
    // event ClaimFiled(
    //     address indexed policyholder,
    //     uint256 indexed policyId,
    //     uint256 amount
    // );
    // event ClaimApproved(
    //     address indexed policyholder,
    //     uint256 indexed policyId,
    //     uint256 amount
    // );
    event RewardsDistributed(RiskLevel indexed riskLevel, uint256 totalRewards);
    uint256 public constant REWARD_INTERVAL = 1 weeks;

    // Constructor
    constructor() {
        pools[RiskLevel.Low] = Pool(
            0,
            0,
            100 ether,
            block.timestamp + 200 days
        );
        pools[RiskLevel.Medium] = Pool(
            0,
            0,
            200 ether,
            block.timestamp + 250 days
        );
        pools[RiskLevel.High] = Pool(
            0,
            0,
            300 ether,
            block.timestamp + 270 days
        );
    }

    // Functions

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
}
