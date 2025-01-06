import { AppBar, Toolbar, useTheme } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

import { css } from "@emotion/react";

export default function Layout() {
  const theme = useTheme();

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

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div css={styles}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/profiles">Profiles</NavLink>
          </div>
        </Toolbar>
      </AppBar>
      <hr />

      <Outlet />
    </div>
  );
}
