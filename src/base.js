import Rebase from "re-base";
import firebase from "firebase";

// Firebase config
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDmiRtLHEBEB3REhWpLP1WjGiNnhFvGFBo",
  authDomain: "catch-of-the-day-twofivefive.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-twofivefive.firebaseio.com",
})

// Rebase bindings
const base = Rebase.createClass(firebaseApp.database())

// Named export
export { firebaseApp }

// Default export
export default base