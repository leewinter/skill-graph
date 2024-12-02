import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import { ThemeProvider, Global, css } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Adding Global Styles */}
      <Global
        styles={css`
          div.tabulator-popup-container {
            position: absolute;
            left: 100px;
            background: ${theme.palette.background.paper};
            cursor: pointer;
            padding: 3px;
            border: 2px solid ${theme.palette.divider};
            border-radius: 5px;
          }
          .tabulator-edit-list-item.active {
            background: ${theme.palette.secondary.light};
          }
        `}
      />
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
