// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;


interface IBoringMeta {
     
    struct Meta {
        uint   timestamp;
        uint256 usedGas;
        uint    numberOfBlocks;
    }

    function getLastDayMeta() external view returns (Meta memory);

    function getDailyMeta(uint timestamp) external view returns (Meta memory);

    function updateDailyMeta(uint timestamp, uint256 usedGas, uint numberOfBlocks) external;
}