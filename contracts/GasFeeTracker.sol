// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GasFeeComparator {
    struct Transaction {
        address sender;
        uint256 gasUsed;
        uint256 timestamp;
    }

    Transaction[] public transactions;
    event TransactionRecorded(address indexed sender, uint256 gasUsed, uint256 timestamp);

    function recordTransaction() public {
        uint256 startGas = gasleft();
        transactions.push(Transaction(msg.sender, 0, block.timestamp)); // Temporary push

        uint256 gasUsed = startGas - gasleft(); // Calculate actual gas used
        transactions[transactions.length - 1].gasUsed = gasUsed;

        emit TransactionRecorded(msg.sender, gasUsed, block.timestamp);
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }
}
