"use client";
import { useState } from "react";

export default function InvestModal({ property, reitContract, account, onClose }) {
  const [shares, setShares] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
        if (!reitContract) return alert("Connect wallet first!");
        if (!account) return alert("Connect wallet first!");
        if (shares <= 0) return alert("Enter a valid number of shares");

        setLoading(true);
        try {
            const tx = await reitContract.purchaseShares(property.id, shares);
            await tx.wait();
            alert("Purchase successful!");
            onClose();
        } catch (err) {
            console.error(err);
            alert("Transaction failed!");
        }
        setLoading(false);
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl text-black font-bold mb-4">{property.name}</h2>
        <p>Price per Share: {property.pricePerShare} USDC</p>
        <input
          type="number"
          placeholder="Number of Shares"
          className="border p-2 rounded w-full mt-2 text-black"
          value={shares}
          onChange={(e) => setShares(Number(e.target.value))}
        />
        <div className="flex justify-end mt-4 space-x-2">
          <button className="bg-gray-500 text-black px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-black px-4 py-2 rounded"
            onClick={handlePurchase}
            disabled={loading}
          >
            {loading ? "Processing..." : "Buy Shares"}
          </button>
        </div>
      </div>
    </div>
  );
}
