# Backend Directory
cd backend-contracts/backend-contracts
npx hardhat node
npx hardhat run ignition/modules/reit/scripts/deploy.js --network localhost

# Frontend Directory
cd frontend-dapp
npm run dev
