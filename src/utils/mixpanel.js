import mixpanel from "mixpanel-browser";
import LogRocket from "logrocket";
import makeId from "./makeIdUtil";

mixpanel.init("e338ea1bac5ef125937525a304521900", { debug: false });
LogRocket.init("zwugvl/trait-ranker");



LogRocket.getSessionURL(function (sessionURL) {
  mixpanel.track("LogRocket", { sessionURL: sessionURL });
});

export function makeAndTrackId(len) {
  let Id = makeId(len);
  mixpanel.track("Session Start",{'steps': 1});
  mixpanel.people.increment('sessions', 1);
  return Id;
}

export function trackRankingPage(topTraits) {
  mixpanel.track('Ranking Step', {'steps': 2}, {'chosen traits': topTraits});
}
export function trackResultsPage(topTraits){
  mixpanel.track('Results Step', {'steps': 3}, {'top traits': topTraits});
}
export function trackShare(){
  mixpanel.track('Shared');
}
export function trackShowTraits(){
  mixpanel.track('Show Traits');
}
export function trackGuessTraits(){
  mixpanel.track('Guess Traits');
}
export function trackGuessed(guesses){
  mixpanel.track('Guessed', {'Guessed traits':  guesses});
}
export function trackShareConversion(source){
  mixpanel.track('Share Conversion', {'Source': source});
}
