// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
         GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } 
         from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6g1-cHCBJ-lhwFrr8L1ANehyGwkHjw6k",
    authDomain: "hospital-47fce.firebaseapp.com",
    databaseURL: "https://hospital-47fce-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hospital-47fce",
    storageBucket: "hospital-47fce.firebasestorage.app",
    messagingSenderId: "54581383019",
    appId: "1:54581383019:web:07333ea8bf1594999b062e",
    measurementId: "G-4EB69QFJDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Signup function
document.getElementById("signup").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User Signed Up:", userCredential.user);
        alert("Account Created Successfully!");
    } catch (error) {
        console.error("Error:", error.message);
        alert(error.message);
    }
});

// Sign-in function
document.getElementById("signin").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User Signed In:", userCredential.user);
        alert("Signed In Successfully!");
    } catch (error) {
        console.error("Error:", error.message);
        alert(error.message);
    }
});

// Google Sign-In
document.getElementById("googleSignIn").addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("Google User:", result.user);
        alert("Signed in with Google!");
    } catch (error) {
        console.error("Error:", error.message);
        alert(error.message);
    }
});

// Logout function
document.getElementById("logout").addEventListener("click", async () => {
    try {
        await signOut(auth);
        console.log("User Signed Out");
        alert("Signed Out Successfully!");
    } catch (error) {
        console.error("Error:", error.message);
        alert(error.message);
    }
});

// Detect Authentication State
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("user-status").innerText = `Logged in as: ${user.email}`;
    } else {
        document.getElementById("user-status").innerText = "No user logged in.";
    }
});