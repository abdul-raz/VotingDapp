import { Contract, BrowserProvider } from "ethers";
import CONTRACT_ABI from "./contractABI"; // Create a contractABI.ts file and paste ABI there

const CONTRACT_ADDRESS = "0xYourContractAddress"; // Replace with your deployed Sepolia address

export const getContractInstance = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  } else {
    console.error("Ethereum provider not found");
    return null;
  }
};
