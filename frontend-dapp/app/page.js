"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ConnectWallet from "../components/ConnectWallet";
import PropertyCard from "../components/PropertyCard";
import InvestModal from "../components/InvestModal";
import propertiesData from "../data/properties.json";
import { REIT_TOKEN_ADDRESS, REIT_ABI } from "../constants";

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [reitContract, setReitContract] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    if (signer) {
      const contract = new ethers.Contract(REIT_TOKEN_ADDRESS, REIT_ABI, signer);
      setReitContract(contract);
    }
  }, [signer]);

  return (
    <div className="p-6">
      <ConnectWallet setProvider={setProvider} setSigner={setSigner} setAccount={setAccount} />

      <h1 className="text-2xl font-bold mt-4 mb-4">Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {propertiesData.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onInvest={(prop) => setSelectedProperty(prop)}
          />
        ))}
      </div>

      {selectedProperty && (
        <InvestModal
          property={selectedProperty}
          reitContract={reitContract}
          account={account}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}
