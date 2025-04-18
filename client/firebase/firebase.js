import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
import "@react-native-firebase/storage";

// const firebaseConfig = {
//     apiKey: process.env.EXPO_PUBLIC_FIREBASE_KEY!,
//     authDomain: process.env.EXPO_PUBLIC_FIREBASE_DOMAIN!,
//     databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE!,
//     projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
//     storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET!,
//     messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
//     appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID!,
//     measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID!,
// };

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

const apps = firebase.apps;
export const app = apps[0];

export const auth = firebase.auth(app);
export const firestore = firebase.firestore(app);
export const storage = firebase.storage(app);

if (__DEV__) {
  auth.useEmulator("http://localhost:9099");
  firestore.useEmulator("http://localhost:8080");
  storage.useEmulator("http://localhost:9199");
}
export default firebase;
