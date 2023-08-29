import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// const firebaseConfig = {
//     apiKey: "AIzaSyATeTc76FP0LW5hc3DReQXSkbhAoInMuJA",
//     authDomain: "mdn-event-calendar.firebaseapp.com",
//     projectId: "mdn-event-calendar",
//     storageBucket: "mdn-event-calendar.appspot.com",
//     messagingSenderId: "849420215787",
//     appId: "1:849420215787:web:c1db4aeedb85f7ea9ce5ae",
//     databaseURL: "https://mdn-event-calendar-default-rtdb.europe-west1.firebasedatabase.app/"
// };
const firebaseConfig = {
    apiKey: "AIzaSyAguE5JirUaexmUvIugozzAr-uC55RRH_k",
    authDomain: "mdn-event-calendar-2.firebaseapp.com",
    databaseURL: "https://mdn-event-calendar-2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mdn-event-calendar-2",
    storageBucket: "mdn-event-calendar-2.appspot.com",
    messagingSenderId: "793824516774",
    appId: "1:793824516774:web:75b776736fe59dbc64b267"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);   
