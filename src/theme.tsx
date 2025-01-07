import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#012030", // Blue
    },
    secondary: {
      main: "#DAFDBA", // Orange (better contrast with blue)
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
