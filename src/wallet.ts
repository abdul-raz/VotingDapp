import { getProvider } from "./utils/ethersConfig";

export const connectWallet = async () => {
  try {
    const provider = getProvider();
    if (!provider) {
      return { error: "MetaMask is not installed" };
    }

    const accounts = await provider.send("eth_requestAccounts", []);
    return { account: accounts[0] };
  } catch (error) {
    console.error("Wallet connection error:", error);
    return { error: "Failed to connect wallet" };
  }
};
