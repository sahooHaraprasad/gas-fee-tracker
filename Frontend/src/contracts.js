export const contractAddress = "0xa14BeF0F72c9297397dFd820ca3e2599B3233470"; 
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
        "internalType": "struct GasFeeTracker.Transaction[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
