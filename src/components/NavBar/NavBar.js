import React, { useContext, useState } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

import HelpDialogBox from "./HelpDialogBox";
import HomeButton from "./HomeButton";
import CustomStepper from "./CustomStepper";
import { ProgressContext } from "../App";
const steps = ["Label 1", "Label 2", "Label 3"];
const NavBar = ({ history }) => {
  const { progress, activeStep } = useContext(ProgressContext);
  const [progressState, setProgressState] = progress;
  const [activeStepState, setActiveStepState] = activeStep;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <HomeButton history={history} />
          <CustomStepper
            steps={steps}
            current={activeStepState}
            progress={progressState}
          />
          <div style={{ marginLeft: "auto" }}>
            <HelpDialogBox />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavBar;
