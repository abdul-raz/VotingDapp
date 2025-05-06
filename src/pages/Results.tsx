import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import CONTRACT_ABI from "../utils/contractABI";

const CONTRACT_ADDRESS = "0xBAAC0dA20707C850d0C24e97099dC00673023394";

const ResultsPage = () => {
  const [winner, setWinner] = useState<{ name: string; votes: number } | null>(
    null
  );
  const [votingEnded, setVotingEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [declaring, setDeclaring] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkVotingStatus();

    // 🔄 Auto-refresh winner data every 5 seconds
    const interval = setInterval(() => {
      if (votingEnded) {
        fetchWinner();
      }
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [votingEnded]);

  // ✅ Check if voting has ended
  const checkVotingStatus = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      const ended = await contract.votingEnded();
      setVotingEnded(ended);

      if (ended) {
        fetchWinner();
      } else {
        setLoading(false);
      }

      // ✅ Check if the connected user is the admin
      const signer = await provider.getSigner();
      const adminAddress = await contract.admin();
      const userAddress = await signer.getAddress();
      setIsAdmin(userAddress.toLowerCase() === adminAddress.toLowerCase());

      console.log("Voting ended:", ended);
      console.log(
        "Is Admin:",
        userAddress.toLowerCase() === adminAddress.toLowerCase()
      );
    } catch (error) {
      console.error("Error checking voting status:", error);
      setLoading(false);
    }
  };

  // ✅ Fetch Winner from Smart Contract
  const fetchWinner = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      // Ensure voting has ended
      const ended = await contract.votingEnded();
      if (!ended) {
        console.log("Voting has not ended yet. Winner cannot be fetched.");
        return;
      }
      setVotingEnded(true);

      // Fetch winner details
      const [winnerId, winnerName, winnerVoteCount] =
        await contract.getWinner();
      setWinner({ name: winnerName, votes: Number(winnerVoteCount) });

      console.log(`Winner: ${winnerName}, Votes: ${winnerVoteCount}`);
    } catch (error) {
      console.error("Error fetching winner:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Declare Winner Function
  const handleDeclareWinner = async () => {
    if (!isAdmin) {
      alert("❌ You are not the admin!");
      return;
    }

    setDeclaring(true);
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const tx = await contract.declareWinner();
      await tx.wait();

      alert("🏆 Winner declared successfully!");
      fetchWinner(); // Refresh the winner
    } catch (error) {
      console.error("Error declaring winner:", error);
      alert("Failed to declare the winner.");
    }
    setDeclaring(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#1e1e2f",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        🏆 Election Results
      </Typography>

      <Paper
        sx={{
          width: "90%",
          maxWidth: "500px",
          backgroundColor: "#222236",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)",
          textAlign: "center",
        }}
      >
        {loading ? (
          <Typography>Loading results...</Typography>
        ) : votingEnded ? (
          winner ? (
            <>
              <Typography variant="h5" fontWeight="bold">
                🎉 Winner: {winner.name}
              </Typography>
              <Typography variant="h6" color="#ffcc00" mt={2}>
                Votes: {winner.votes}
              </Typography>
            </>
          ) : (
            <Typography>No winner data available.</Typography>
          )
        ) : (
          <Typography color="red" fontWeight="bold">
            🚫 Winner Not Declared Yet!
          </Typography>
        )}
      </Paper>

      {/* ✅ Declare Winner Button (Only Admin) */}
      {!winner && votingEnded && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: "20px",
            backgroundColor: "#6a5acd",
            "&:hover": { backgroundColor: "#5548b0" },
          }}
          onClick={handleDeclareWinner}
          disabled={declaring}
        >
          {declaring ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            "Declare Winner"
          )}
        </Button>
      )}
    </Box>
  );
};

export default ResultsPage;
