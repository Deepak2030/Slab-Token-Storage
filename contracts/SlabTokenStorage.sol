// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SlabTokenStorage {

    // Variables
    IERC20 public token;

    // arrays
    uint256[5] public slabs = [100, 200, 300, 400, 500];
    uint256[5] public slabCapacities = [100, 200, 300, 400, 500];

    // mappings
    mapping(address => uint256) public depositSlab;

    // events
    event Deposit(address indexed user, uint256 amount, uint256 slab);
    event Withdraw(address indexed user, uint256 amount, uint256 slab);

    // errors
    error SlabTokenStorage__ERR_AMOUNT_ZERO();
    error SlabTokenStorage__ERR_NO_SLAB_AVAILABLE();
    error SlabTokenStorage__ERR_NO_DEPOSIT_FOUND();

    // constructor
    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    // functions

    // function to deposit the token to the slab 
    function deposit(uint256 _amount) external {
        if (_amount == 0) revert SlabTokenStorage__ERR_AMOUNT_ZERO();

        int256 slabIndex = _getAvailableSlabIndex(_amount);

        if (slabIndex < 0) revert SlabTokenStorage__ERR_NO_SLAB_AVAILABLE();

        depositSlab[msg.sender] = uint256(slabIndex);
        slabCapacities[uint256(slabIndex)] -= _amount;
        token.transferFrom(msg.sender, address(this), _amount);

        emit Deposit(msg.sender, _amount, uint256(slabIndex));
    }

    // function to withdraw the token from the slab
    function withdraw() external {
        uint256 slabIndex = depositSlab[msg.sender];
        if (slabIndex >= 5) revert SlabTokenStorage__ERR_NO_DEPOSIT_FOUND();

        uint256 amount = slabs[slabIndex] - slabCapacities[slabIndex];
        slabCapacities[slabIndex] = slabs[slabIndex];
        delete depositSlab[msg.sender];

        token.transfer(msg.sender, amount);

        emit Withdraw(msg.sender, amount, slabIndex);
    }

    // function to get the slab of depositor
    function getSlabOfDepositor(address _depositor) external view returns (uint256) {
        return depositSlab[_depositor];
    }

    // function to get the available slab Index
    function _getAvailableSlabIndex(uint256 _amount) internal view returns (int256) {
        for (int256 i = 0; i < int256(slabCapacities.length); i++) {
            if (_amount <= slabCapacities[uint256(i)]) {
                return i;
            }
        }
        return -1;
    }

}
