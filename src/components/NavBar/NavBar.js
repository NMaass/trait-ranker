import React, { useState } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

import HelpDialogBox from "./HelpDialogBox";
import HomeButton from "./HomeButton";
import CustomStepper from "./CustomStepper";
const steps = ["Label 1", "Label 2", "Label 3"];
const NavBar = ({ history }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    progress < 90 ? setProgress((prev) => prev + 10) : nextStep();
  };

  const nextStep = () => {
    setProgress(0);
    setActiveStep((prev) => prev + 1);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <HomeButton history={history} />
          <CustomStepper
            steps={steps}
            current={activeStep}
            progress={progress}
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
