import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, #1e1e2f, #2c2c3c, #3a3a4a)",
        color: "#ffffff",
        padding: "60px 20px",
      }}
    >
      {/* === Hero Title === */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h2" fontWeight="bold">
          The Future of Voting is Here
        </Typography>
      </motion.div>

      {/* === Subtitle === */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Typography variant="h6" sx={{ mt: 2, maxWidth: "800px" }}>
          Secure, Transparent, and Trustless Voting System Built on Ethereum.
          Say goodbye to election fraud and ensure fair results with blockchain
          technology.
        </Typography>
      </motion.div>

      {/* === Get Started Button === */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Button
          variant="contained"
          sx={{
            mt: 4,
            px: 4,
            py: 1.5,
            fontSize: "1.2rem",
            background: "#6a5acd",
            "&:hover": { background: "#5548b0" },
          }}
        >
          Get Started
        </Button>
      </motion.div>

      {/* === Why Choose Us Section === */}
      <Box sx={{ mt: 10, maxWidth: "1200px" }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          Why Choose Our Voting dApp?
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {[
            {
              title: "Decentralized & Secure",
              desc: "Your vote is recorded on the blockchain, making it tamper-proof and secure.",
            },
            {
              title: "Transparent & Verifiable",
              desc: "Anyone can verify the election results in real-time without any third party.",
            },
            {
              title: "Fast & Scalable",
              desc: "No more long queues! Vote instantly from anywhere with ease.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
              >
                <Card sx={{ background: "#2a2a3a", color: "#ffffff", p: 2 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>{feature.desc}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* === How It Works Section === */}
      <Box sx={{ mt: 10, maxWidth: "1200px" }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
          How It Works?
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {[
            {
              step: "1️⃣ Register",
              desc: "Admin adds eligible voters to the system securely.",
            },
            {
              step: "2️⃣ Cast Vote",
              desc: "Voters connect their wallet and vote on-chain.",
            },
            {
              step: "3️⃣ See Results",
              desc: "Votes are counted automatically and results are public.",
            },
          ].map((process, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
              >
                <Card sx={{ background: "#2a2a3a", color: "#ffffff", p: 2 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {process.step}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>{process.desc}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Hero;
