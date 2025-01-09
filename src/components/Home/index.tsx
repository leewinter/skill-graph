import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import backgroundImage from "../../../public/skill_chart.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const navigate = useNavigate();

  const { t, ready } = useTranslation();

  const handleGetStarted = () => {
    navigate("/profiles");
  };

  if (!ready) return <div>{t("shared.loading")}</div>;

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
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: 3, 
          borderRadius: 2, 
          boxShadow: 3, 
          maxWidth: "600px", 
          margin: "auto",
          textAlign: "center", 
          mt: 5,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {t("home.title")}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" gutterBottom>
          {t("home.p1")}          
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t("home.p2")}           
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          display="block"
          gutterBottom
        >
          {t("home.caption1")}          
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGetStarted}
          >
            {t("home.getStartedBtn")}            
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
