export const storeTraits = (topTraits) => {
  const traits = JSON.stringify(topTraits);
  localStorage.setItem("traits", traits);
  console.log(
    "setting storage traits: ",
    JSON.parse(localStorage.getItem("traits"))
  );
};

export const fetchTopTraits = (topTraits, history) => {
  let storedTraits;
  if (topTraits.length > 0) {
    console.log("getting top traits", topTraits);
    storedTraits = topTraits;
  } else {
    storedTraits = JSON.parse(localStorage.getItem("traits"));
    console.log("grabbing from storage:", storedTraits);
    if (storedTraits.length === 0) {
      history.push("/");
    }
  }
  return storedTraits;
};
