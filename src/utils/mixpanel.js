import mixpanel from "mixpanel-browser";
import LogRocket from "logrocket";
import makeId from "./makeIdUtil";

mixpanel.init("e338ea1bac5ef125937525a304521900", { debug: true });
LogRocket.init("zwugvl/trait-ranker");

LogRocket.getSessionURL(function (sessionURL) {
  mixpanel.track("LogRocket", { sessionURL: sessionURL });
});

export function makeAndTrackId(len) {
  let Id = makeId(len);
  mixpanel.identify("Id");
  mixpanel.people.set({'Steps':0})
  return Id;
}
export function trackRankingPage(topTraits) {}
