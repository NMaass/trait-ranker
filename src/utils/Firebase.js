import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

import makeId from "./makeIdUtil";



const firebaseConfig = {

    apiKey: "AIzaSyBGLwRSqZ-ZO8O7t2Jx0J0ZNq9P5MgzkJ0",
    authDomain: "trait-ranker.firebaseapp.com",
    projectId: "trait-ranker",
    storageBucket: "trait-ranker.appspot.com",
    messagingSenderId: "387696334301",
    appId: "1:387696334301:web:e7d512845f69e5a2e25234",
    measurementId: "G-K0FPHGRC6R"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const db = getFirestore(app);

export async function getHash ({len}) {
    let timeout = false
    while (timeout === false){
        const hash = makeId(len)
        const docRef = doc(db, hash);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            console.log('repeat hash')
        }
        else {
            console.log("hash "+hash)
            return hash
        }
    }
}
export async function setTraits({hash, traitArray}) {
    await setDoc(doc(db,'Traits',hash),{
        traits: traitArray
    }).catch((e)=>{
        console.log(e)
    })
    console.log(doc(db,'Traits', hash))
}
export async function getTraits({hash})  {
    return await getDoc(db,'Traits',hash)
}
