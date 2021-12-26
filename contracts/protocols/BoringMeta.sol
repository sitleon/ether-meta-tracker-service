// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import {IBoringMeta} from '../interfaces/IBoringMeta.sol';


/**
 * @title BoringMeta
 */
contract BoringMeta is IBoringMeta {

    address private owner;
    uint private perviousDay;

    mapping(uint => Meta) private dailyMetaList;
    
    // event for EVM logging
    event MetaUpdate(uint timestamp);
    
    // modifier to check if caller is owner
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    /**
     * @dev Set contract deployer as owner
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Store updated meta in variable
     * @param timestamp timestamp
     * @param usedGas total used gas
     * @param numberOfBlocks generated blocks
     */
    function updateDailyMeta(uint timestamp, uint256 usedGas, uint numberOfBlocks) override public isOwner {
        dailyMetaList[timestamp] = Meta(timestamp, usedGas, numberOfBlocks);
        perviousDay = timestamp;
        emit MetaUpdate(perviousDay);
    }

    /**
     * @dev Get pervious day meta
     */
    function getLastDayMeta() external view override returns (Meta memory) {
        return dailyMetaList[perviousDay];
    }

    /**
     * @dev Get particular day meta
     * @param timestamp query day in timestamp format
     */
    function getDailyMeta(uint timestamp) external view override returns (Meta memory) {
        return dailyMetaList[timestamp];
    }

}