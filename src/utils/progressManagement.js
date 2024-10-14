function createProgress() {
  return {
    stage: "selection",
    date: Date.now(),
    data: {
      selection: {
        column1: [],
        column2: [],
        column3: [],
        selectedTraits: [],
      },
      ranking: {
        currentMatch: null,
        currentStanding: [],
        isComplete: false,
        progressPercent: 0,
        comparisonStack: [],
        mergeStack: [],
        totalComparisons: 0,
        comparisonsMade: 0,
      },
      results: {
        traits: [],
      },
    },
  };
}
function updateSelectionProgress(progress, selectionData) {
  return {
    ...progress,
    stage: "selection",
    date: Date.now(),
    data: {
      ...progress.data,
      selection: {
        ...progress.data.selection,
        ...selectionData, // Updated data from the selection phase
      },
    },
  };
}
function updateRankingProgress(progress, rankingData) {
  return {
    ...progress,
    stage: "ranking",
    date: Date.now(),
    data: {
      ...progress.data,
      ranking: {
        ...progress.data.ranking,
        ...rankingData, // Updated data from the ranking phase
      },
    },
  };
}
function updateResultsProgress(progress, resultsData) {
  return {
    ...progress,
    stage: "results",
    date: Date.now(),
    data: {
      ...progress.data,
      results: {
        ...progress.data.results,
        ...resultsData, // Updated data from the results phase
      },
    },
  };
}
