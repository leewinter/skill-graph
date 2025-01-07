import { AppBar, Box, Toolbar, useTheme } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

import LanguageSelector from "@src/components/LanguageSelector";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const theme = useTheme();

  const { t, ready } = useTranslation();

  const styles = css`
    a {
      padding: ${theme.spacing(0.8)};
      color: ${theme.palette.primary.contrastText}; /* Ensure contrast with AppBar */
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;

      &.active {
        color: ${theme.palette.secondary.light}; /* Highlight active link */
      }

      &:hover {
        color: ${theme.palette.secondary.dark}; /* Hover effect */
      }
    }
  `;

  if (!ready) return <div>{t("shared.loading")}</div>;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/* Navigation links with flex-grow */}
          <Box css={styles} sx={{ flexGrow: 1, display: "flex" }}>
            <NavLink to="/">{t("layout.home")}</NavLink>
            <NavLink to="/profiles">{t("layout.profiles")}</NavLink>
          </Box>

          {/* Language selector aligned to the right */}
          <LanguageSelector />
        </Toolbar>
      </AppBar>
      <hr />

      <Outlet />
    </div>
  );
}
