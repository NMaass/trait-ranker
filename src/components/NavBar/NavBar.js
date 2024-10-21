import React, { useContext } from "react";
import { AppBar, Box, Toolbar, IconButton, Grid } from "@mui/material";
import { FaUndo } from "react-icons/fa";

import HelpDialogBox from "./HelpDialogBox";
import HomeButton from "./HomeButton";
import CustomStepper from "./CustomStepper";
import { ProgressContext } from "../App";
import { UndoContext } from "../App";
const steps = ["Label 1", "Label 2", "Label 3"];
const NavBar = ({ history }) => {
  const { progress, activeStep } = useContext(ProgressContext);
  const [progressState, setProgressState] = progress;
  const [activeStepState, setActiveStepState] = activeStep;
  const { undoFunction } = useContext(UndoContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <HomeButton history={history} />
            </Grid>
            <Grid item flexGrow={1}>
              <CustomStepper
                steps={steps}
                current={activeStepState}
                progress={progressState}
              />
            </Grid>
            <Grid item>
              <Grid container justifyContent="flex-end" alignItems="center">
                <Grid item>
                  <HelpDialogBox />
                </Grid>
                {undoFunction.current && (
                  <Grid item>
                    <IconButton onClick={undoFunction.current}>
                      <FaUndo />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavBar;
