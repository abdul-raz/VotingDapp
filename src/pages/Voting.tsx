import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";

const VotingPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState("");

  const handleVote = () => {
    if (!selectedCandidate) {
      alert("Please select a candidate before voting!");
      return;
    }
    // Handle vote submission (Integrate with smart contract later)
    console.log(`Voted for: ${selectedCandidate}`);
    alert(`Vote submitted for: ${selectedCandidate}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#1e1e2f", // Dark theme
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        🗳️ Cast Your Vote
      </Typography>

      {/* Candidates List */}
      <Box
        sx={{
          backgroundColor: "#222236",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ marginBottom: "1rem", textAlign: "center" }}
        >
          Select a Candidate:
        </Typography>
        <RadioGroup
          value={selectedCandidate}
          onChange={(e) => setSelectedCandidate(e.target.value)}
        >
          <FormControlLabel
            value="Candidate A"
            control={<Radio sx={{ color: "white" }} />}
            label="Candidate A"
          />
          <FormControlLabel
            value="Candidate B"
            control={<Radio sx={{ color: "white" }} />}
            label="Candidate B"
          />
          <FormControlLabel
            value="Candidate C"
            control={<Radio sx={{ color: "white" }} />}
            label="Candidate C"
          />
        </RadioGroup>
      </Box>

      {/* Vote Button */}
      <Button
        variant="contained"
        onClick={handleVote}
        sx={{
          marginTop: "2rem",
          backgroundColor: "#ffcc00",
          color: "#1e1e2f",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#e6b800" },
        }}
      >
        Submit Vote
      </Button>
    </Box>
  );
};

export default VotingPage;
