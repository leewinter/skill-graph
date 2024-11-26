/** @jsxImportSource @emotion/react */
import { Outlet, NavLink } from "react-router-dom";
import { AppBar, Toolbar, useTheme } from "@mui/material";
import { css } from "@emotion/react";

export default function Layout() {
  const theme = useTheme();

  const styles = css`
    a {
      padding: ${theme.spacing(1.5)};
      color: ${theme.palette.text.primary};
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;

      &.active {
        color: ${theme.palette.secondary.main};
      }

      &:hover {
        color: ${theme.palette.primary.light};
      }
    }
  `;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div css={styles}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/table">Table</NavLink>
            <NavLink to="/graph">Graph</NavLink>
          </div>
        </Toolbar>
      </AppBar>
      <hr />

      <Outlet />
    </div>
  );
}
