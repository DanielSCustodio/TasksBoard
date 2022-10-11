import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDaK_2p32cg0nzIbod6yJFuyuJFYjEVzSk',
  authDomain: 'tasksboard-5400b.firebaseapp.com',
  projectId: 'tasksboard-5400b',
  storageBucket: 'tasksboard-5400b.appspot.com',
  messagingSenderId: '219170421693',
  appId: '1:219170421693:web:77fffac745c2a2888ef0d4',
  measurementId: 'G-ECBDGSHSJW',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
