import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, rpcUrl, abi } from "./constants";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const initProvider = async () => {
      try {
        if (window.ethereum) {
          const ethProvider = new ethers.BrowserProvider(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          setProvider(ethProvider);
          const signer = await ethProvider.getSigner();
          const gasFeeContract = new ethers.Contract(contractAddress.trim(), abi, signer);
          setContract(gasFeeContract);
          setWalletConnected(true);
        } else {
          setError("MetaMask is not installed. Please install it.");
        }
      } catch (err) {
        setError("Error connecting to MetaMask.");
        console.error("Provider connection error:", err);
      }
    };
    initProvider();
  }, []);

  const fetchTransactions = async () => {
    if (!contract) {
      setError("Contract is not initialized");
      return;
    }
    try {
      const data = await contract.getAllTransactions();
      setTransactions(data);
    } catch (err) {
      setError("Error fetching transactions");
      console.error("Fetch error:", err);
    }
  };

  const recordTransaction = async () => {
    if (!provider || !contract) {
      setError("Provider or contract is not initialized");
      return;
    }

    try {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log("Signer Address:", address);

      const tx = await contract.connect(signer).recordTransaction();
      await tx.wait();
      fetchTransactions();
    } catch (err) {
      setError("Transaction failed. Ensure MetaMask is connected.");
      console.error("Transaction error:", err);
    }
  };

  return (
    <div>
      <h1>Ethereum Gas Fee Tracker</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!walletConnected && (
        <button onClick={async () => {
          if (window.ethereum) {
            try {
              await window.ethereum.request({ method: "eth_requestAccounts" });
              setWalletConnected(true);
              setError(null);
            } catch (err) {
              setError("User rejected wallet connection.");
            }
          } else {
            setError("MetaMask is not installed.");
          }
        }}>Connect Wallet</button>
      )}

      <button onClick={recordTransaction} disabled={!walletConnected}>Record Transaction</button>
      <button onClick={fetchTransactions}>Fetch Transactions</button>

      <h2>Transactions</h2>
      <ul>
        {transactions.map((tx, index) => {
          const gasUsedGwei = parseFloat(ethers.formatUnits(tx.gasUsed, "gwei"));
          let comparison = "";

          if (index > 0) {
            const prevGasUsed = parseFloat(ethers.formatUnits(transactions[index - 1].gasUsed, "gwei"));
            if (gasUsedGwei > prevGasUsed) {
              comparison = "Higher than previous one 🔺";
            } else if (gasUsedGwei < prevGasUsed) {
              comparison = "Lower than previous one 🔻";
            } else {
              comparison = "Equal to previous one ➖";
            }
          }

          return (
            <li key={index}>
              <p>Transaction {index + 1} ✅</p>
              <p>Sender: {tx.sender}</p>
              <p>Gas Fees: {gasUsedGwei.toFixed(6)} Gwei</p>
              {index > 0 && <p style={{ fontWeight: "bold", color: comparison.includes("Higher") ? "red" : "green" }}>{comparison}</p>}
              <p>Timestamp: {new Date(Number(tx.timestamp) * 1000).toLocaleString()}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
