export default function generateBracket(numPlayers) {
  const numRounds = Math.ceil(Math.log2(numPlayers)) + 4;
  const matches = [];
  let roundIndex = 0;
  let upperMatches = 0;
  let middleMatches = 0;
  let lowerMatches = 0;
  let upperPlayers = numPlayers;
  let middlePlayers = 0;
  let lowerPlayers = 0;
  let winnersBye = false;
  let middleBye = false;
  let losersBye = false;
  let winnersFinalsIndex = 0;
  let middleSemiFinalIndex = 0;
  let lowerQuarterFinalsIndex = 0;
  let nextLowerMatches = 0;
  let nextMiddleMatches = 0;
  let nextUpperMatches = Math.ceil(numPlayers / 2);
  let freezeUpper = false;
  let nextFreezeUpper = false;
  let freezeMiddle = false;
  let nextFreezeMiddle = false;

  for (let i = 0; i < numRounds; i++) {
    console.log("round: ", i);
    lowerMatches = nextLowerMatches;
    middleMatches = nextMiddleMatches;
    upperMatches = nextUpperMatches;

    //check if any finals are being played
    if (upperMatches === 1 && !freezeUpper) {
      upperPlayers = 0;
      upperMatches = 0;
      nextUpperMatches = 0;
      winnersFinalsIndex = matches.length;
      roundIndex++;

      matches.push([]);

      console.log("winnersFinalsIndex: ", winnersFinalsIndex);
    }

    if (middleMatches === 1 && upperPlayers === 0 && !freezeMiddle) {
      middlePlayers = 0;
      middleMatches = 0;
      nextMiddleMatches = 0;
      middleSemiFinalIndex = matches.length;
      roundIndex++;
      matches.push([]);
      console.log("middleFinalsIndex: ", middleSemiFinalIndex);
    }

    if (lowerMatches === 1 && middlePlayers === 0) {
      lowerPlayers = 0;
      lowerMatches = 0;
      nextLowerMatches = 0;
      lowerQuarterFinalsIndex = matches.length;
      roundIndex++;
      matches.push([]);
      console.log("lowerFinalsIndex: ", lowerQuarterFinalsIndex);
    }

    //detrmine if one of those matches will have a bye
    if (lowerPlayers % 2) {
      losersBye = true;
      console.log("losersBye: ", losersBye);
    }

    //half of lower players eliminated
    if (i !== 2) {
      lowerPlayers = Math.ceil(lowerPlayers / 2);
    }
    if (!freezeMiddle) {
      console.log(
        "lowerPlayers added from middle: ",
        Math.floor(middlePlayers / 2)
      );
      lowerPlayers += Math.floor(middlePlayers / 2);
    }

    nextLowerMatches = Math.ceil(lowerPlayers / 2);
    if (i === 1) {
      nextLowerMatches = lowerPlayers;
    }
    console.log("lowerPlayers: ", lowerPlayers);

    //detrmine if one of those matches will have a bye
    if (!freezeMiddle) {
      if (middlePlayers % 2) {
        middleBye = true;
        console.log("middleBye: ", middleBye);
      }

      //half of middle players eliminated
      middlePlayers = Math.ceil(middlePlayers / 2);
      console.log("middlePlayers: ", middlePlayers);

      //half of the upper players decend into middle bracket
      if (!freezeUpper) {
        middlePlayers += Math.floor(upperPlayers / 2);
        console.log("middlePlayers: ", middlePlayers);
      }
    }
    //calculate next round middle matches
    nextMiddleMatches = Math.ceil(middlePlayers / 2);

    //determine if one of those matches will have a bye
    if (!freezeUpper) {
      if (upperPlayers % 2) {
        winnersBye = true;
        console.log("winnderBye", winnersBye);
      }
      //half of upper players eliminated
      upperPlayers = Math.ceil(upperPlayers / 2);
      console.log("upperPlayers: ", upperPlayers);
    }
    //calculate next round upper matches
    nextUpperMatches = Math.ceil(upperPlayers / 2);

    //add the number of matches to the nextRoundIndex
    if (middleMatches < lowerMatches) {
      nextFreezeMiddle = true;
      nextFreezeUpper = true;
      nextMiddleMatches = 0;
      nextUpperMatches = 0;
      console.log(
        "freezeMiddle: ",
        nextFreezeMiddle,
        middleMatches,
        lowerMatches
      );
    } else {
      freezeMiddle = false;
      console.log(
        "freezeMiddle: ",
        nextFreezeMiddle,
        middleMatches,
        lowerMatches
      );
    }
    if (upperMatches < middleMatches) {
      nextFreezeUpper = true;

      nextUpperMatches = 0;
      console.log(
        "freezeUpper: ",
        nextFreezeUpper,
        upperMatches,
        middleMatches
      );
    } else {
      freezeUpper = false;
      console.log(
        "freezeUpper: ",
        nextFreezeUpper,
        upperMatches,
        middleMatches
      );
    }
    let nextRoundIndex =
      roundIndex + lowerMatches + upperMatches + middleMatches;

    console.log(
      "nextRoundIndex: ",
      nextRoundIndex,
      "roundIndex: ",
      roundIndex,
      "upperMatches: ",
      upperMatches,
      "middleMatches: ",
      middleMatches,
      "lowerMatches: ",
      lowerMatches
    );

    //generate upper matches
    if (!freezeUpper) {
      for (let j = 0; j < upperMatches; j++) {
        let losersOffset = j;

        let winnersOffSet = Math.floor(j / 2);
        if (middleMatches === 0) {
          losersOffset = Math.floor(j / 2);
        }

        let winnersPath = nextRoundIndex + winnersOffSet;

        console.log(
          "winnersPath: ",
          winnersPath,
          "winnersOffset: ",
          winnersOffSet
        );

        let losersPath = nextRoundIndex + losersOffset + nextUpperMatches;
        console.log("losersPath: ", losersPath, "losersOffset: ", losersOffset);
        if (nextFreezeUpper) {
          winnersPath =
            nextRoundIndex +
            winnersOffSet +
            nextMiddleMatches +
            nextLowerMatches +
            Math.floor(upperMatches / 2);
          losersPath =
            nextRoundIndex +
            losersOffset +
            nextMiddleMatches +
            nextLowerMatches +
            upperMatches * 2;
        }
        matches.push([winnersPath, losersPath]);
        console.log(
          "upper match:",
          j,
          "id: ",
          matches.length - 1,
          " winnersPath: ",
          winnersPath,
          " losersPath: ",
          losersPath
        );
      }

      //account for bye
      if (winnersBye) {
        matches[matches.length - 1][1] = -1;
        winnersBye = false;
        console.log("bye: ", matches.length - 1);
      }
    }
    if (!freezeMiddle) {
      //generate middle matches
      for (let j = 0; j < middleMatches; j++) {
        let losersOffset = j;
        let winnersOffSet = j;
        if (upperMatches === 0 || nextFreezeUpper === true) {
          winnersOffSet = Math.floor(j / 2);
        }

        let winnersPath = nextRoundIndex + nextUpperMatches + winnersOffSet;
        console.log(
          "winnersPath: ",
          winnersPath,
          "winnersOffset: ",
          winnersOffSet
        );

        let losersPath =
          nextRoundIndex + nextUpperMatches + losersOffset + middleMatches;

        if (i === 2) {
          losersPath = nextRoundIndex - lowerMatches + j;
        }
        if (nextFreezeMiddle) {
          winnersPath = nextRoundIndex + winnersOffSet + nextLowerMatches * 2;
          losersPath =
            nextRoundIndex +
            nextLowerMatches * 2 +
            middleMatches +
            losersOffset;
        }

        console.log("losersPath: ", losersPath, "losersOffset: ", losersOffset);
        matches.push([winnersPath, losersPath]);
        console.log(
          "middle match:",
          j,
          "id: ",
          matches.length - 1,
          " winnersPath: ",
          winnersPath,
          " losersPath: ",
          losersPath
        );
      }

      //account for bye
      if (middleBye) {
        matches[matches.length - 1][1] = -1;
        middleBye = false;
        console.log("bye: ", matches.length - 1);
      }
    }

    //generate lower matches
    for (let j = 0; j < lowerMatches; j++) {
      let winnersOffSet = j;
      if (nextFreezeMiddle) {
        winnersOffSet = Math.floor(j / 2);
      }
      let winnersPath =
        nextRoundIndex + nextUpperMatches + middleMatches + winnersOffSet;
      console.log(
        "winnersPath: ",
        winnersPath,
        "winnersOffset: ",
        winnersOffSet
      );
      let losersPath = -1;
      matches.push([winnersPath, losersPath]);
      console.log(
        "lower match:",
        j,
        "id: ",
        matches.length - 1,
        " winnersPath: ",
        winnersPath,
        " losersPath: ",
        losersPath
      );
    }

    //account for bye
    if (losersBye) {
      console.log("losers bye: ", matches.length - 1);
      matches[matches.length - 1][1] = -1;
      losersBye = false;
    }

    roundIndex = nextRoundIndex;
    if (nextFreezeMiddle) {
      roundIndex += middleMatches;
      freezeMiddle = true;
    }
    if (nextFreezeUpper) {
      roundIndex += upperMatches;
      freezeUpper = true;
    }
  }
  let lowerSemisIndex = matches.length;
  matches.push([]);
  let lowerFinalsIndex = matches.length;
  matches.push([]);
  let lowerGrandsIndex = matches.length;
  matches.push([]);

  let middleFinalsIndex = matches.length;
  matches.push([]);
  let middleGrandsIndex = matches.length;
  matches.push([]);
  let grandFinalsIndex = matches.length;
  matches.push([-1, -1]);

  matches[lowerQuarterFinalsIndex] = [lowerSemisIndex, -1];
  matches[lowerSemisIndex] = [lowerFinalsIndex, -1];
  matches[lowerFinalsIndex] = [lowerGrandsIndex, -1];
  matches[lowerGrandsIndex] = [middleGrandsIndex, -1];

  matches[middleSemiFinalIndex] = [middleFinalsIndex, lowerFinalsIndex];
  matches[middleFinalsIndex] = [middleGrandsIndex, lowerGrandsIndex];
  matches[middleGrandsIndex] = [grandFinalsIndex, -1];

  matches[winnersFinalsIndex] = [grandFinalsIndex, middleFinalsIndex];

  testBracket(matches);
  return matches;
}

function testBracket(originalMatches) {
  let matches = originalMatches.slice();
  console.log("testing bracket: ", matches);
  let matchPaths = Array(matches.length)
    .fill(0)
    .map((x) => []);
  console.log(matchPaths);
  for (let i = 0; i < matches.length; i++) {
    for (let j = 0; j < matches[i].length; j++) {
      if (matches[i][j] !== -1) {
        matchPaths[matches[i][j]].push(i);
      } else {
        matchPaths[i].push(-1);
      }
    }
  }
  let allpopulated = true;
  for (let i = 0; i < matchPaths.length; i++) {
    if (matchPaths[i].length !== 2) {
      //console.log("matchPaths: ", matchPaths[i]);
      allpopulated = false;
    }
  }
  console.log(matchPaths);
  return allpopulated;
}
