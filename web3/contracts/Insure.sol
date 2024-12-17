// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Insure {
    // Structs
    struct Policy {
        uint256 policyId;
        address policyholder;
        uint256 coverage;
        uint256 premium;
        uint256 duration;
        uint256 expiry;
        bool claimed;
        string reason;
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

    // Add liquidity to a pool
    function addLiquidity(
        RiskLevel riskLevel
    ) public payable poolNotExpired(riskLevel) {
        require(msg.value > 0, "Must send ETH");
        require(
            pools[riskLevel].totalFunds + msg.value <= pools[riskLevel].cap,
            "Exceeds pool cap"
        );

        // Check if this is the first contribution
        if (liquidityProviders[msg.sender][riskLevel].amountStaked == 0) {
            liquidityProvidersList[riskLevel].push(msg.sender);
        }

        liquidityProviders[msg.sender][riskLevel].amountStaked += msg.value;
        pools[riskLevel].totalFunds += msg.value;

        emit LiquidityAdded(msg.sender, riskLevel, msg.value);
    }

    function getLiquidityProviderDetails(
        RiskLevel riskLevel,
        address _provider
    ) public view returns (LiquidityProvider memory) {
        return liquidityProviders[_provider][riskLevel];
    }

    // Get pool information by risk level
    function getPoolByRiskLevel(
        RiskLevel riskLevel
    ) public view returns (Pool memory) {
        return pools[riskLevel];
    }

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
                reason: "",
                riskLevel: riskNumber,
                name: _name
            })
        );

        emit PolicyPurchased(msg.sender, policies[msg.sender].length - 1);
    }

    function getPoliciesByAddress(
        address _policyholder
    ) public view returns (Policy[] memory) {
        return policies[_policyholder];
    }

    // File a claim
    function fileClaim(
        uint256 policyId,
        uint256 claimAmount,
        string memory reason
    ) external {
        // Find the policy in the user's array of policies
        Policy[] storage userPolicies = policies[msg.sender];
        bool policyFound = false;

        for (uint256 i = 0; i < userPolicies.length; i++) {
            if (userPolicies[i].policyId == policyId) {
                Policy storage policy = userPolicies[i];

                // Ensure the caller is the policyholder
                require(policy.policyholder == msg.sender, "Not policyholder");

                // Perform policy checks
                require(block.timestamp < policy.expiry, "Policy expired");
                require(!policy.claimed, "Policy already claimed");
                require(
                    claimAmount <= policy.coverage,
                    "Claim exceeds coverage"
                );

                RiskLevel risk = RiskLevel(policy.riskLevel);
                require(
                    claimAmount <= pools[risk].totalFunds,
                    "Insufficient pool funds"
                );

                // Update policy and pool state
                policy.claimed = true;
                pools[risk].totalFunds -= claimAmount;
                payable(msg.sender).transfer(claimAmount);
                policy.reason = reason;

                // Emit events
                emit ClaimFiled(msg.sender, policyId, claimAmount);
                emit ClaimApproved(msg.sender, policyId, claimAmount);

                policyFound = true;
                break;
            }
        }

        // Revert if the policyId was not found
        require(policyFound, "Policy not found");
    }

    // Distribute rewards to LPs
    // Calculate and allow the provider to claim their rewards
    function claimRewards(RiskLevel riskLevel) external {
        LiquidityProvider storage lp = liquidityProviders[msg.sender][
            riskLevel
        ];
        Pool storage pool = pools[riskLevel];

        require(lp.amountStaked > 0, "No liquidity provided");
        require(pool.totalFunds > 0, "No funds in the pool");
        require(pool.rewards > 0, "No rewards available");

        uint256 share = (lp.amountStaked * pool.rewards) / pool.totalFunds;
        pool.rewards -= share;
        lp.rewardsEarned += share;

        // Transfer rewards to the provider
        (bool success, ) = payable(msg.sender).call{value: share}("");
        require(success, "Transfer failed");

        emit RewardsDistributed(riskLevel, share);
    }

    // Modifiers
    modifier poolNotExpired(RiskLevel riskLevel) {
        require(block.timestamp < pools[riskLevel].expiry, "Pool expired");
        _;
    }
}
