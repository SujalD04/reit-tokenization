"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { REIT_TOKEN_ADDRESS, REIT_ABI, USDC_TOKEN_ADDRESS, USDC_ABI } from "../../constants";
import propertiesData from "../../data/properties.json";

export default function Dashboard() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [reitContract, setReitContract] = useState(null);
  const [usdcContract, setUsdcContract] = useState(null);
  const [balances, setBalances] = useState([]);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask!");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const prov = new ethers.BrowserProvider(window.ethereum);
    const signer = await prov.getSigner();
    const account = await signer.getAddress();

    setProvider(prov);
    setSigner(signer);
    setAccount(account);

    const reit = new ethers.Contract(REIT_TOKEN_ADDRESS, REIT_ABI, signer);
    const usdc = new ethers.Contract(USDC_TOKEN_ADDRESS, USDC_ABI, signer);
    setReitContract(reit);
    setUsdcContract(usdc);
  };

  useEffect(() => {
    if (!reitContract || !account) return;

    const fetchBalances = async () => {
      const arr = [];
      for (let prop of propertiesData) {
        const bal = await reitContract.balanceOf(account, prop.id);
        if (bal > 0) arr.push({ ...prop, shares: bal.toString() });
      }
      setBalances(arr);
    };

    fetchBalances();
  }, [reitContract, account]);

  const fetchUSDCBalance = async () => {
    if (!usdcContract || !account) return;
    const bal = await usdcContract.balanceOf(account);
    return ethers.formatUnits(bal, 18);
  };

  return (
    <div className="p-6">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={connectWallet}
      >
        {account ? `Connected: ${account.substring(0, 6)}...` : "Connect Wallet"}
      </button>

      <h1 className="text-2xl font-bold mt-4 mb-4">Your Portfolio</h1>

      {balances.length === 0 ? (
        <p>No shares owned yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {balances.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow-md">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p>Shares Owned: {item.shares}</p>
              <p>Price per Share: {item.pricePerShare} USDC</p>
            </div>
          ))}
        </div>
      )}

      <p className="mt-4">
        USDC Balance: {usdcContract && account ? fetchUSDCBalance() : "0"}
      </p>
    </div>
  );
}
