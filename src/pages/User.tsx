import { Container, Typography, Paper, Box } from "@mui/material";
import UserDashboard from "../components/UserDashboard";

const User = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #161a2b, #222437, #2c2e45)",
        padding: "40px",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "600px",
          padding: "30px",
          background: "rgba(40, 42, 55, 0.9)",
          borderRadius: "16px",
          color: "#ffffff",
          textAlign: "center",
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
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
          User Dashboard
        </Typography>
        <UserDashboard />
      </Paper>
    </Box>
  );
};

export default User;
