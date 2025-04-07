// filepath: c:\Users\Admin\Downloads\2ndTodoList-main\src\firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Add Firestore import

const firebaseConfig = {
  apiKey: "AIzaSyB7XiBKcB2_SN0Z8CgpmS_CnyYj5onYYww",
  authDomain: "todo-list-42f6e.firebaseapp.com",
  projectId: "todo-list-42f6e",
  storageBucket: "todo-list-42f6e.appspot.com",
  messagingSenderId: "468682786804",
  appId: "1:468682786804:web:15b7a8cf0d90ceb9619ba1",
  measurementId: "G-2ZF8BWKGXC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

console.log("Firebase initialized:", app.name);

export { auth, db }; // Export db