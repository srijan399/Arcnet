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

    // Constants
    uint256 public constant LOW_PREMIUM = 1;
    uint256 public constant MEDIUM_PREMIUM = 2;
    uint256 public constant HIGH_PREMIUM = 3;

    // uint256 public constant REWARD_INTERVAL = 1 weeks;

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

    function purchasePolicy(
        uint256 coverage, // Coverage in wei
        uint256 duration, // Duration in seconds
        uint8 riskNumber // Risk Number (1 = Low, 2 = Medium, 3 = High)
    ) public payable {
        RiskLevel risk = RiskLevel(riskNumber - 1);
        pools[risk].rewards += msg.value;

        policies[msg.sender].push(
            Policy({
                policyholder: msg.sender,
                coverage: coverage,
                premium: msg.value,
                duration: duration,
                expiry: block.timestamp + duration,
                claimed: false,
                riskLevel: riskNumber
            })
        );

        emit PolicyPurchased(msg.sender, policies[msg.sender].length - 1);
    }
}
