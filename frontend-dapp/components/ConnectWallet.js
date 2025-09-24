"use client";
import { useState } from "react";
import { ethers } from "ethers";

export default function ConnectWallet({ setProvider, setSigner, setAccount }) {
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask!");
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Check network
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x7a69") { // Hardhat Local
        try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x7a69" }],
        });
        } catch (switchError) {
        console.error("Switch network error:", switchError);
        return alert("Switch your MetaMask network to Hardhat Local!");
        }
    }

    const prov = new ethers.BrowserProvider(window.ethereum);
    const signer = await prov.getSigner();
    const account = await signer.getAddress();

    setProvider(prov);
    setSigner(signer);
    setAccount(account);
    setConnected(true);
    };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={connectWallet}
    >
      {connected ? "Wallet Connected" : "Connect Wallet"}
    </button>
  );
}
