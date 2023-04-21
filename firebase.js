import{ getApp, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB8bh9QkAOSQLhrDz7IEHtFOf6gtrtxw9k",
  authDomain: "mobile-application-20220213.firebaseapp.com",
  projectId: "mobile-application-20220213",
  storageBucket: "mobile-application-20220213.appspot.com",
  messagingSenderId: "993606364063",
  appId: "1:993606364063:web:3bf44e1268fc37d6f3ebaa"
};

function createFirebaseApp(config) {
  try {
    return getApp()
  } catch {
    return initializeApp(config)
  }
}


const firebaseApp = createFirebaseApp(firebaseConfig)

export const firebaseDB = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp);
export default firebaseApp