//Taken from https://stackoverflow.com/questions/65042023/how-to-do-an-stepper-with-progress-bars-material-ui
import React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import styled from "@emotion/styled";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import Icon from "@mui/material/Icon";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
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
  background: currentStep || done ? "LightSkyBlue" : "#dedede",
  color: currentStep || done ? "#000" : "#999",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledLabelContainer = styled("div")({
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
});

function CustomStepper(props) {
  const { steps, current, progress } = props;

  function StepContent({ done, index }) {
    return done ? "✓" : index + 1;
  }

  const ProgressBar = ({ current, step, progress }) => {
    console.log(progress);
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
            top: 12,
            left: "calc(-50% + 20px)",
            right: "calc(50% + 20px)",
            backgroundColor: "#ffd8ba61",
          },
          "& .MuiLinearProgress-bar": {
            backgroundColor: "LightSkyBlue",
          },
        }}
      />
    );
  };

  function getStepIcon(currentStep) {
    switch (currentStep) {
      case 0:
        return <CompareArrowsOutlinedIcon />;
      case 1:
        return <SortOutlinedIcon />;
      case 2:
        return <WorkspacePremiumOutlinedIcon />;
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
