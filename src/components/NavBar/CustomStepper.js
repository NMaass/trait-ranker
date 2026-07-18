//Taken from https://stackoverflow.com/questions/65042023/how-to-do-an-stepper-with-progress-bars-material-ui
import React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import styled from "@emotion/styled";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { useTheme, alpha } from "@mui/material/styles";

function CustomStepper(props) {
  const theme = useTheme();

  const StyledStepper = styled("ul")({
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-around",
    padding: 0,
    width: "100%",
  });
  const StyledStepperStep = styled("li")({
    position: "relative",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  });
  const StyledStepperStepIndex = styled("div")(({ currentStep, done }) => ({
    width: "30px",
    height: "30px",
    lineHeight: "30px",
    borderRadius: "50%",
    background:
      currentStep || done
        ? theme.palette.secondary.main
        : alpha(theme.palette.common.white, 0.18),
    color:
      currentStep || done
        ? theme.palette.secondary.contrastText
        : alpha(theme.palette.common.white, 0.85),
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s ease, color 0.2s ease",
    // Shrink slightly on narrow screens so the three circles + bars fit.
    "@media (max-width: 374.98px)": {
      width: "24px",
      height: "24px",
      lineHeight: "24px",
    },
  }));

  const StyledLabelContainer = styled("div")({
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
  });
  const StyledStepLabel = styled("span")(({ currentStep, done }) => ({
    fontSize: "0.7rem",
    marginTop: "2px",
    color:
      currentStep || done
        ? theme.palette.common.white
        : alpha(theme.palette.common.white, 0.7),
    "@media (max-width: 374.98px)": {
      display: "none",
    },
  }));

  const { steps, current, progress } = props;

  const ProgressBar = ({ current, step, progress }) => {
    let value = 0;
    if (current + 1 === step) {
      value = progress;
    } else if (current >= step) {
      value = 100;
    }

    return (
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          "&.MuiLinearProgress-root": {
            flex: "1 1 auto",
            position: "absolute",
            // Vertically center the 4px bar on the step circle (30px circle →
            // center 15px → top 13px; the small-screen circle is 24px → 10px).
            top: 13,
            "@media (max-width: 374.98px)": {
              top: 10,
            },
            left: "calc(-50% + 20px)",
            right: "calc(50% + 20px)",
            // Track derives from secondary at low alpha so the unfilled
            // portion still reads against the AppBar gradient.
            backgroundColor: alpha(theme.palette.secondary.main, 0.3),
          },
          "& .MuiLinearProgress-bar": {
            backgroundColor: theme.palette.secondary.main,
          },
        }}
      />
    );
  };

  function getStepIcon(currentStep) {
    // "small" (20px) keeps the glyph centered inside the 30px circle — and
    // inside the 24px circle on narrow phones, where the default 24px icon
    // touched the edges and read as misaligned.
    switch (currentStep) {
      case 0:
        return <CompareArrowsOutlinedIcon fontSize="small" />;
      case 1:
        return <SortOutlinedIcon fontSize="small" />;
      case 2:
        return <WorkspacePremiumOutlinedIcon fontSize="small" />;
      default:
        return null;
    }
  }

  function renderStep(label, key) {
    const { current, progress } = this;
    const done = key < current;
    const currentStep = key === current;
    return (
      <StyledStepperStep key={key}>
        <StyledLabelContainer>
          <StyledStepperStepIndex currentStep={currentStep} done={done}>
            {getStepIcon(key)}
          </StyledStepperStepIndex>
          <StyledStepLabel currentStep={currentStep} done={done}>
            {label}
          </StyledStepLabel>
        </StyledLabelContainer>
        {!!key && (
          <ProgressBar current={current} step={key} progress={progress} />
        )}
      </StyledStepperStep>
    );
  }

  return (
    <StyledStepper>
      {steps.map(renderStep, { current, progress })}
    </StyledStepper>
  );
}

CustomStepper.propTypes = {
  steps: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired,
  progress: PropTypes.number,
};

export default CustomStepper;
