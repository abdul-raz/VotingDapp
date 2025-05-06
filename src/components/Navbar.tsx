import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

interface NavbarProps {
  account: string | null;
  onConnect: () => Promise<void>;
}

const Navbar: React.FC<NavbarProps> = ({ account, onConnect }) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#222236", // Dark theme
        boxShadow: "none",
        padding: "0.5rem 1rem",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Voting dApp
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Button sx={navButtonStyle} component={Link} to="/">
            Home
          </Button>
          <Button sx={navButtonStyle} component={Link} to="/admin">
            Admin
          </Button>
          <Button sx={navButtonStyle} component={Link} to="/user">
            User
          </Button>
          <Button sx={navButtonStyle} component={Link} to="/results">
            Results
          </Button>
          <Button sx={navButtonStyle} component={Link} to="/voting">
            Voting
          </Button>
        </Box>

        {/* Wallet Connect Button */}
        {account ? (
          <Typography
            variant="body1"
            sx={{
              color: "#ffcc00",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            {account.slice(0, 6)}...{account.slice(-4)}
          </Typography>
        ) : (
          <Button sx={walletButtonStyle} onClick={onConnect}>
            Connect Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

// Navbar Button Styles
const navButtonStyle = {
  color: "white",
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#ffcc00",
    transform: "scale(1.05)",
  },
};

// Wallet Button Styles
const walletButtonStyle = {
  color: "#fff",
  backgroundColor: "#ffcc00",
  fontWeight: "bold",
  textTransform: "none",
  padding: "6px 16px",
  "&:hover": {
    backgroundColor: "#e6b800",
    transform: "scale(1.05)",
  },
};

export default Navbar;
