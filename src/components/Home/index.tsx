import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/profiles");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
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
        <Box textAlign="center" mt={4}>
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
