import { initializeApp } from "firebase/app";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

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

export async function setDBTraits(hash, traitArray) {
  await setDoc(doc(db, "Traits", hash), {
    traits: traitArray,
  }).catch((e) => {
    console.error("Failed to save shared traits", e);
  });
}

export async function getDBTraits(hash) {
  const docRef = doc(db, "Traits", hash);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().traits;
  }
  return undefined;
}
