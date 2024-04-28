/** @jsxImportSource @emotion/react */
import { Outlet, NavLink } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import { css } from "@emotion/react";

export default function Layout() {
  const styles = css`
    a {
      padding: 10px;
    }
    a.active {
      color: white;
    }
  `;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div css={styles}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/table">table</NavLink>
            <NavLink to="/graph">graph</NavLink>
          </div>
        </Toolbar>
      </AppBar>
      <hr />

      <Outlet />
    </div>
  );
}
