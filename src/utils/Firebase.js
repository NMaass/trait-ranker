import { initializeApp } from "firebase/app";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

import makeId from "./makeIdUtil";

const firebaseConfig = {
  apiKey: "AIzaSyBGLwRSqZ-ZO8O7t2Jx0J0ZNq9P5MgzkJ0",
  authDomain: "trait-ranker.firebaseapp.com",
  projectId: "trait-ranker",
  storageBucket: "trait-ranker.appspot.com",
  messagingSenderId: "387696334301",
  appId: "1:387696334301:web:e7d512845f69e5a2e25234",
  measurementId: "G-K0FPHGRC6R",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export async function getHash(len) {
  let timeout = false;
  while (timeout === false) {
    const hash = makeId(len);
    const docRef = doc(db, hash);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("repeat hash");
    } else {
      console.log("hash " + hash);
      return hash;
    }
  }
}

export async function setDBTraits(hash, traitArray) {
  await setDoc(doc(db, "Traits", hash), {
    traits: traitArray,
  }).catch((e) => {
    console.log(e);
  });
  console.log(doc(db, "Traits", hash), traitArray);
}

export async function getDBTraits(hash) {
  const docRef = doc(db, "Traits", hash);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const traits = docSnap.data().traits;
    console.log(traits);
    return traits;
  } else {
    console.log("no doc");
  }
}

export async function setDBProgress(hash, progress) {
  await setDoc(doc(db, "Progress", hash), progress).catch((e) => {
    console.log(e);
  });
}

export async function getDBProgress(hash) {
  const docRef = doc(db, "Progress", hash);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No stored progress found");
    return null;
  }
}
