## 🚀 Project Setup Instructions

### 📦 Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend-contracts/backend-contracts
   ```

2. Start the local Hardhat node:
   ```bash
   npx hardhat node
   ```

3. Deploy the REIT module using Hardhat Ignition:
   ```bash
   npx hardhat run ignition/modules/reit/scripts/deploy.js --network localhost
   ```

---

### 💻 Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend-dapp
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

---

### ✅ Notes

- Ensure all dependencies are installed in both `backend-contracts` and `frontend-dapp` directories using `npm install`.
- The frontend assumes the backend contracts are deployed to `localhost`. Make sure the Hardhat node is running before launching the frontend.

---
