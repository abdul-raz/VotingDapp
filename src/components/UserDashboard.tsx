import { useState, useEffect } from "react";
import { Box, Button, Typography, Paper, Container } from "@mui/material";
import { ethers } from "ethers";
import CONTRACT_ABI from "../utils/contractABI";
const CONTRACT_ADDRESS = "0xBAAC0dA20707C850d0C24e97099dC00673023394";

const UserDashboard = () => {
  const [candidates, setCandidates] = useState<
    { id: number; name: string; voteCount: number }[]
  >([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    fetchCandidates();
    checkUserStatus();
  }, []);

  const fetchCandidates = async () => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );
      const [ids, names] = await contract.getAllCandidates();

      const candidatesList = ids.map((id: bigint, index: number) => ({
        id: Number(id),
        name: names[index],
        voteCount: 0,
      }));

      setCandidates(candidatesList);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const checkUserStatus = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setAccount(userAddress);

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      // Check if the user has voted
      const voted = await contract.hasVoted(userAddress);
      setHasVoted(voted);

      // Check if the user is a registered voter
      const registered = await contract.registeredVoters(userAddress);
      setIsRegistered(registered);
    } catch (error) {
      console.error("Error checking user status:", error);
    }
  };

  const handleVote = async (candidateId: number) => {
    if (!isRegistered) {
      alert("You are not a registered voter.");
      return;
    }
    if (hasVoted) {
      alert("You have already voted!");
      return;
    }

    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const tx = await contract.vote(candidateId);
      await tx.wait();

      setHasVoted(true);
      alert("Vote submitted successfully!");
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
        padding: "40px",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "550px",
          padding: "30px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          color: "#ffffff",
          textAlign: "center",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            textTransform: "uppercase",
            background: "linear-gradient(135deg, #b3c1ff, #7986cb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🗳️ Vote for Your Candidate
        </Typography>

        {!isRegistered && (
          <Typography
            sx={{ color: "red", fontWeight: "bold", marginBottom: 2 }}
          >
            ❌ You are not a registered voter!
          </Typography>
        )}

        <Container sx={{ mt: 2 }}>
          {candidates.length === 0 ? (
            <Typography>No candidates available</Typography>
          ) : (
            candidates.map((candidate) => (
              <Paper
                key={candidate.id}
                elevation={5}
                sx={{
                  padding: "15px",
                  marginTop: "15px",
                  background: "rgba(255, 255, 255, 0.15)",
                  borderRadius: "12px",
                  color: "#fff",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.5)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "8px",
                  }}
                >
                  {candidate.name}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    background: !isRegistered
                      ? "gray"
                      : hasVoted
                      ? "linear-gradient(135deg, #5e5e5e, #8d8d8d)"
                      : "linear-gradient(135deg, #6a5acd, #5548b0)",
                    color: "#fff",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    padding: "10px 24px",
                    borderRadius: "30px",
                    transition: "all 0.3s ease-in-out",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
                    "&:hover": {
                      background: !isRegistered
                        ? "gray"
                        : hasVoted
                        ? "linear-gradient(135deg, #4d4d4d, #6e6e6e)"
                        : "linear-gradient(135deg, #5a48b0, #4836a8)",
                      transform: "scale(1.05)",
                      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.5)",
                    },
                  }}
                  disabled={!isRegistered || hasVoted}
                  onClick={() => handleVote(candidate.id)}
                >
                  {!isRegistered
                    ? "Not Registered"
                    : hasVoted
                    ? "Voted"
                    : "Vote"}
                </Button>
              </Paper>
            ))
          )}
        </Container>
      </Paper>
    </Box>
  );
};

export default UserDashboard;
