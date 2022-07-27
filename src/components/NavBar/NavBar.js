import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

import HelpDialogBox from "./HelpDialogBox";
import HomeButton from "./HomeButton";

const NavBar = ({ history }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <HomeButton history={history} />
          <div style={{ marginLeft: "auto" }}>
            <HelpDialogBox />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavBar;
