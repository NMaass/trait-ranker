import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDBTraits } from "../../utils/Firebase";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import RankingTrait from "../TraitCards/RankingTrait";
import SmallTraitList from "../SmallTraitList";
import GuessPage from "./GuessPage";
import TryItButton from "./TryItButton";
import { trackShowTraits, trackGuessTraits } from "../../utils/mixpanel";

const SharedPage = ({ columnData, setColumnData, history }) => {
  let { id } = useParams();
  const [storedTraits, setStoredTraits] = useState([]);
  const [showList, setShowList] = useState(false);
  const [showGuessing, setShowGuessing] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const isMobile = useMediaQuery("(min-width:1024px)");
  useEffect(() => {
    (async () => {
      await getDBTraits(id).then((result) => {
        setStoredTraits(result);
      });
    })();
  }, [id]);
  const showTraits = () => {
    trackShowTraits();
    setShowList(true);
    setShowOptions(false);
  };
  const showGuess = () => {
    trackGuessTraits();
    setShowGuessing(true);
    setShowOptions(false);
  };
  console.log("storedTraits", storedTraits);
  return (
    <Grid
      container
      spacing={isMobile ? 60 : 3}
      alignItems="center"
      justifyContent="center"
      direction={isMobile ? "row" : "column"}
    >
      {showOptions && (
        <Grid item>
          <RankingTrait onClick={showGuess} trait="Guess the traits" />
        </Grid>
      )}
      {showOptions && (
        <Grid item>
          <RankingTrait onClick={showTraits} trait="Show the traits" />
        </Grid>
      )}

      {showList && (
        <Grid item>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            style={{ transform: "Scale(1.15)" }}
          >
            <Grid item>
              <Typography variant={isMobile ? "h3" : "h5"} color="black">
                Top traits
              </Typography>
            </Grid>
            <Grid item>
              <SmallTraitList traits={storedTraits} />
            </Grid>
            <Grid item>
              <TryItButton history={history} source="Guess" />
            </Grid>
          </Grid>
        </Grid>
      )}
      {showGuessing && (
        <Grid item>
          <GuessPage
            traits={storedTraits}
            columnData={columnData}
            setColumnData={setColumnData}
            history={history}
          />
        </Grid>
      )}
    </Grid>
  );
};
export default SharedPage;
