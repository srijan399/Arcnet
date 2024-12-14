// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lock {
    // Structs
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

    // Functions

    // Add liquidity to a pool
    function addLiquidity(
        RiskLevel riskLevel
    ) public payable poolNotExpired(riskLevel) {
        require(msg.value > 0, "Must send ETH");
        require(
            pools[riskLevel].totalFunds + msg.value <= pools[riskLevel].cap,
            "Exceeds pool cap"
        );

        liquidityProviders[msg.sender][riskLevel].amountStaked += msg.value;
        pools[riskLevel].totalFunds += msg.value;

        emit LiquidityAdded(msg.sender, riskLevel, msg.value);
    }

    // Modifiers
    modifier poolNotExpired(RiskLevel riskLevel) {
        require(block.timestamp < pools[riskLevel].expiry, "Pool expired");
        _;
    }
}
