// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lock {
    // Structs
    struct Policy {
        uint256 policyId;
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
    // Maintain a list of addresses for each risk level
    mapping(RiskLevel => address[]) public liquidityProvidersList;
    mapping(address => mapping(RiskLevel => uint256)) public lastClaimed;

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

    // Purchase a policy
    function purchasePolicy(
        uint256 coverage, // Coverage in wei
        uint256 duration, // Duration in seconds
        uint8 riskNumber, // Risk Number (1 = Low, 2 = Medium, 3 = High)
        string memory _name, // Name of the policy
        uint256 policyID
    ) public payable {
        RiskLevel risk = RiskLevel(riskNumber - 1);
        pools[risk].rewards += msg.value;

        policies[msg.sender].push(
            Policy({
                policyId: policyID,
                policyholder: msg.sender,
                coverage: coverage,
                premium: msg.value,
                duration: duration,
                expiry: block.timestamp + duration,
                claimed: false,
                riskLevel: riskNumber,
                name: _name
            })
        );
    }

    modifier onlyPolicyHolder(uint256 policyId) {
        bool isPolicyHolder = false;

        // Search through the policies array to verify the caller owns the policy
        for (uint256 i = 0; i < policies[msg.sender].length; i++) {
            if (policies[msg.sender][i].policyId == policyId) {
                isPolicyHolder = true;
                break;
            }
        }

        require(isPolicyHolder, "Not the policyholder");
        _;
    }
}
