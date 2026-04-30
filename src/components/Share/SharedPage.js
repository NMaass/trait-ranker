import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDBTraits } from "../../utils/Firebase";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import RankingTrait from "../TraitCards/RankingTrait";
import SmallTraitList from "../SmallTraitList";
import GuessPage from "./GuessPage";
import TryItButton from "./TryItButton";
import useBreakpoint from "../../utils/useBreakpoint";
import { trackShowTraits, trackGuessTraits } from "../../utils/mixpanel";

const SharedPage = ({ columnData, setColumnData, history }) => {
  let { id } = useParams();
  const [storedTraits, setStoredTraits] = useState([]);
  const [showList, setShowList] = useState(false);
  const [showGuessing, setShowGuessing] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  // 'loading' | 'ok' | 'error'
  const [status, setStatus] = useState("loading");
  const { isDesktop } = useBreakpoint();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await getDBTraits(id);
        if (cancelled) return;
        if (Array.isArray(result) && result.length > 0) {
          setStoredTraits(result);
          setStatus("ok");
        } else {
          // Doc missing or empty array — treat as a bad / expired link.
          setStatus("error");
        }
      } catch (e) {
        if (!cancelled) {
          console.error("Failed to load shared traits", e);
          setStatus("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
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

  if (status === "loading") {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "60vh" }}
        spacing={2}
      >
        <Grid item>
          <CircularProgress aria-label="Loading shared traits" />
        </Grid>
        <Grid item>
          <Typography variant="body1">Loading shared traits…</Typography>
        </Grid>
      </Grid>
    );
  }

  if (status === "error") {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "60vh" }}
        spacing={2}
      >
        <Grid item>
          <Typography variant="h5">This share link doesn't exist or has expired.</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/Selection")}
          >
            Try it yourself
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      spacing={isDesktop ? 60 : 3}
      alignItems="center"
      justifyContent="center"
      direction={isDesktop ? "row" : "column"}
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
          >
            <Grid item>
              <Typography variant={isDesktop ? "h3" : "h5"} color="black">
                Top traits
              </Typography>
            </Grid>
            <Grid item>
              <SmallTraitList traits={storedTraits} />
            </Grid>
            <Grid item style={{ marginTop: "5vw" }}>
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
