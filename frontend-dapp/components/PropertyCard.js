"use client";
export default function PropertyCard({ property, onInvest }) {
  return (
    <div className="border p-4 rounded shadow-md">
      <img src={property.image} alt={property.name} className="w-full h-40 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{property.name}</h2>
      <p>{property.location}</p>
      <p>Price per Share: {property.pricePerShare} USDC</p>
      <p>Total Shares: {property.totalShares}</p>
      <button
        className="bg-green-500 text-black px-4 py-2 rounded mt-2"
        onClick={() => onInvest(property)}
      >
        Invest
      </button>
    </div>
  );
}
