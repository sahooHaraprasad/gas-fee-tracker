export const contractAddress = "0x32fFd54324140D19fe12ba0Af697D958Da3ED435";
export const rpcUrl = "https://ethereum-sepolia.publicnode.com";
export const abi = [
  {
    "inputs": [],
    "name": "recordTransaction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllTransactions",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "sender", "type": "address" },
          { "internalType": "uint256", "name": "gasUsed", "type": "uint256" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
        ],
        "internalType": "struct GasFeeComparator.Transaction[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
