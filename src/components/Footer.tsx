import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#222236", // Same dark theme as Navbar
        color: "white",
        textAlign: "center",
        padding: "1.5rem 0",
        marginTop: "auto",
        borderTop: "2px solid rgba(255, 255, 255, 0.1)", // Subtle border
      }}
    >
      <Typography variant="body1" sx={{ fontSize: "1rem", fontWeight: "500" }}>
        &copy; {new Date().getFullYear()} Voting dApp. All Rights Reserved.
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: "0.9rem",
          color: "rgba(255, 255, 255, 0.7)", // Slightly faded
          marginTop: "0.5rem",
        }}
      >
        Built with ❤️ for decentralized and secure voting.
      </Typography>
    </Box>
  );
};

export default Footer;
