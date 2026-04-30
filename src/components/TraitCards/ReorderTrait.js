import React from "react";
import "../../style/CardStyle.scss";
import { traitIcons } from "../../utils/listOfAllTraits";
import { Chip } from "@mui/material";
import useBreakpoint from "../../utils/useBreakpoint";

const ReorderTrait = ({ trait, provided, color }) => {
  // Original code had a malformed media query (`useMediaQuery("(min-width:1024px"`
  // missing the closing `)`). Centralized hook fixes both the typo and the
  // misleading `isMobile` name.
  const { isDesktop } = useBreakpoint();

  return (
    <Chip
      icon={traitIcons[trait]}
      label={trait}
      {...provided.dragHandleProps}
      draggable={true}
      id={trait}
      color={color}
      sx={isDesktop ? { minWidth: "300px" } : { minWidth: "80vw" }}
    />
  );
};
export default ReorderTrait;
