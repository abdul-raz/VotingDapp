import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import User from "./pages/User";
import Results from "./pages/Results";
import Voting from "./pages/Voting";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { connectWallet } from "./wallet";

function App() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const checkWalletConnection = async () => {
      const { account } = await connectWallet();
      if (account) setAccount(account);
    };
    checkWalletConnection();
  }, []);

  const handleConnect = async () => {
    const { account, error } = await connectWallet();
    if (account) setAccount(account);
    if (error) alert(error);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Router>
        <Navbar account={account} onConnect={handleConnect} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/user" element={<User />} />
            <Route path="/results" element={<Results />} />
            <Route path="/voting" element={<Voting />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
