import { ethers } from "ethers";

// Ensure MetaMask is installed
const getEthereumObject = () => {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    return (window as any).ethereum;
  } else {
    console.error("MetaMask is not installed!");
    return null;
  }
};

// Connect to the Ethereum provider
const getProvider = () => {
  const ethereum = getEthereumObject();
  if (ethereum) {
    return new ethers.BrowserProvider(ethereum);
  }
  return null;
};

// Connect to the contract
const getContract = async () => {
  const provider = getProvider();
  if (!provider) {
    throw new Error("Ethereum provider not found");
  }

  const signer = await provider.getSigner();
  const CONTRACT_ADDRESS = "0xBAAC0dA20707C850d0C24e97099dC00673023394";
  const CONTRACT_ABI = (await import("./contractABI")).default; // Import ABI

  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

export { getProvider, getContract };
