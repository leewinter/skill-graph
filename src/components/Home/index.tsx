import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import backgroundImage from "../../../public/skill_chart.png";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/profiles");
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        position: "relative",
        minHeight: "100vh", // Full viewport height
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
          zIndex: 0, // Background layer
        }}
      />

      {/* Main content with a Box around text */}
      <Box
        id="main-container"
        sx={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
          padding: 3, // Space inside the box
          borderRadius: 2, // Rounded corners
          boxShadow: 3, // Slight shadow for better visibility
          maxWidth: "600px", // Optional: Limit the width of the box
          margin: "auto", // Center the box horizontally
          textAlign: "center", // Center text inside
          mt: 5, // Top margin
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Skill Graph
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" gutterBottom>
          Welcome to Skill Graph! This simple tool allows you to create and
          manage a list of skills, each with an associated ability score.
        </Typography>
        <Typography variant="body1" gutterBottom>
          All your data is securely stored locally on your device, ensuring
          privacy and easy access.
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          display="block"
          gutterBottom
        >
          The data is saved using IndexedDB, Web SQL, or local storage depending
          on your browser compatibility.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
