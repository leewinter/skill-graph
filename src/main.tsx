import { Global, ThemeProvider, css } from "@emotion/react";

import App from "@src/App.tsx";
import { CssBaseline } from "@mui/material";
import { HashRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import en from "@src/locales/en.json";
import es from "@src/locales/es.json"
import { initI18n } from "@src/utils/i18n.ts"
import theme from "@src/theme";

initI18n({
  en,
  es,
});

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
