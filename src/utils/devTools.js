import React from "react";
import allTraits from "../utils/listOfAllTraits";

const skipSelection = (setTopTraits, allTraits, history) => {
  // Select half of the topTraits
  const halfLength = Math.ceil(allTraits.length / 2);
  const selectedTraits = allTraits.slice(0, halfLength);

  // Set the selected traits
  setTopTraits(selectedTraits);

  console.log("Skipping to ranking with traits:", selectedTraits);

  // Navigate to the Rank page
  history.push("/Rank");
};

export const SkipSelectionButton = ({ setTopTraits, history }) => {
  const handleSkipSelection = () => {
    skipSelection(setTopTraits, allTraits, history);
  };

  if (process.env.DEV_MODE) {
    return null;
  }

  return (
    <div
      style={{ position: "fixed", bottom: "10px", right: "10px", zIndex: 9999 }}
    >
      <button
        onClick={handleSkipSelection}
        style={{
          padding: "10px",
          backgroundColor: "#ff4081",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Skip Selection
      </button>
    </div>
  );
};
