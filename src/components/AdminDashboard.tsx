import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ethers } from "ethers";
import CONTRACT_ABI from "../utils/contractABI"; // Ensure correct import

const CONTRACT_ADDRESS = "0xBAAC0dA20707C850d0C24e97099dC00673023394";

const AdminDashboard = () => {
  const [candidateName, setCandidateName] = useState("");
  const [newCandidates, setNewCandidates] = useState<string[]>([]);
  const [voterAddress, setVoterAddress] = useState("");
  const [candidates, setCandidates] = useState<{ id: number; name: string }[]>(
    []
  );
  const [votingEnded, setVotingEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Connect to the smart contract
  const getContract = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected!");
      return null;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    } catch (error) {
      console.error("Error connecting to contract:", error);
      alert("Failed to connect to contract.");
      return null;
    }
  };

  // Fetch candidates & voting status
  const fetchCandidates = async () => {
    try {
      const contract = await getContract();
      if (!contract) return;

      const count = await contract.candidateCount();
      const candidateList = [];

      for (let i = 0; i < count; i++) {
        const candidate = await contract.candidates(i);
        candidateList.push({ id: i, name: candidate.name });
      }

      setCandidates(candidateList);
      const status = await contract.votingEnded();
      setVotingEnded(status);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      alert("Failed to fetch candidates.");
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Register a voter
  const handleRegisterVoter = async () => {
    if (!ethers.isAddress(voterAddress)) {
      return alert("Enter a valid Ethereum address!");
    }
    setLoading(true);
    try {
      const contract = await getContract();
      if (!contract) return;

      const tx = await contract.registerVoter(voterAddress);
      await tx.wait();

      alert(`Voter ${voterAddress} registered successfully!`);
      setVoterAddress("");
    } catch (error) {
      console.error("Error registering voter:", error);
      alert("Failed to register voter.");
    }
    setLoading(false);
  };

  // End the election
  const handleEndVoting = async () => {
    if (!confirm("Are you sure you want to end the voting?")) return;
    setLoading(true);
    try {
      const contract = await getContract();
      if (!contract) return;

      const tx = await contract.endVoting();
      await tx.wait();

      alert("Election ended successfully!");
      setVotingEnded(true);
    } catch (error) {
      console.error("Error ending voting:", error);
      alert("Failed to end voting.");
    }
    setLoading(false);
  };

  const handleDeclareWinner = async () => {
    setLoading(true);
    try {
      const contract = await getContract();
      if (!contract) return;

      const winner = await contract.getWinner();
      alert(
        `Winner: ${winner.winnerName} with ${winner.winnerVoteCount} votes!`
      );
    } catch (error: any) {
      console.error("Error declaring winner:", error);
      alert("Failed to fetch winner details.");
    }
    setLoading(false);
  };


  // Add candidate
  const handleAddCandidate = () => {
    if (!candidateName) return alert("Enter a candidate name!");
    setNewCandidates([...newCandidates, candidateName]);
    setCandidateName("");
  };

  // Reset the election
  const handleResetElection = async () => {
    if (newCandidates.length === 0) return alert("Add at least one candidate!");
    if (!confirm("Are you sure you want to reset the election?")) return;

    setLoading(true);
    try {
      const contract = await getContract();
      if (!contract) return;

      const tx = await contract.resetElection(newCandidates);
      await tx.wait();

      alert("Election reset successfully!");
      setNewCandidates([]);
      fetchCandidates();
    } catch (error) {
      console.error("Error resetting election:", error);
      alert("Failed to reset election.");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1a1d2e, #222437, #2c2e45)",
        padding: "40px",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "500px",
          padding: "30px",
          background: "rgba(40, 42, 55, 0.95)",
          borderRadius: "16px",
          color: "#ffffff",
          textAlign: "center",
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Admin Dashboard
        </Typography>

        {/* Voting Status */}
        <Typography
          variant="h6"
          sx={{
            color: votingEnded ? "#ff4c4c" : "#4caf50",
            fontWeight: "bold",
          }}
        >
          Voting Status: {votingEnded ? "Ended 🔴" : "Active 🟢"}
        </Typography>

        <Divider sx={{ background: "#6a5acd", marginY: "20px" }} />

        {/* Register Voter */}
        <TextField
          fullWidth
          label="Voter Address"
          variant="outlined"
          value={voterAddress}
          onChange={(e) => setVoterAddress(e.target.value)}
          sx={inputStyle}
        />
        <Button
          fullWidth
          variant="contained"
          disabled={loading}
          sx={buttonStyle("#6a5acd")}
          onClick={handleRegisterVoter}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            "Register Voter"
          )}
        </Button>

        <Divider sx={{ marginY: "20px" }} />

        {/* Add Candidate */}
        <TextField
          fullWidth
          label="Candidate Name"
          variant="outlined"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          sx={inputStyle}
        />
        <Button
          fullWidth
          variant="contained"
          sx={buttonStyle("#4caf50")}
          onClick={handleAddCandidate}
        >
          Add Candidate
        </Button>

        <List sx={{ textAlign: "left", color: "#ccc", marginTop: "10px" }}>
          {newCandidates.map((name, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${index + 1}. ${name}`} />
            </ListItem>
          ))}
        </List>

        <Button
          fullWidth
          variant="contained"
          sx={buttonStyle("#ff4c4c")}
          onClick={handleEndVoting}
        >
          End Voting
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={buttonStyle("#ffcc00")}
          onClick={handleDeclareWinner}
        >
          Declare Winner 🏆
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={buttonStyle("#f57c00")}
          onClick={handleResetElection}
        >
          Reset Election
        </Button>
      </Paper>
    </Box>
  );
};

// Styles
const inputStyle = { input: { color: "#ffffff" }, label: { color: "#cccccc" } };
const buttonStyle = (bgColor: string) => ({
  marginTop: "12px",
  background: bgColor,
  "&:hover": { background: "#333" },
});

export default AdminDashboard;
