// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your Firebase configuration (Replace with your actual Firebase credentials)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("appointment-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    // Collecting input values
    const patientName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const purpose = document.getElementById("purpose").value.trim();
    const gender = document.getElementById("gender").value; // Now storing as a string
    const appointmentDate = document.getElementById("date").value;

    if (!patientName || !phone || !age || !purpose || !appointmentDate) {
        alert("Please fill in all required fields!");
        return;
    }

    try {
        // Create a reference to the Appointments collection
        const appointmentRef = doc(collection(db, "Life Hospital", "Appointments"));

        // Save data in Firestore
        await setDoc(appointmentRef, {
            Name: patientName,
            Age: age,
            Email: email || "Not Provided",
            Gender: gender,
            Phone: phone,
            Purpose: purpose,
            Time: new Date(appointmentDate),
            Token: Math.floor(Math.random() * 100) + 1, // Random token number
            LastVisited: new Date()
        });

        alert("Appointment booked successfully!");
        document.getElementById("appointment-form").reset();
    } catch (error) {
        console.error("Error booking appointment: ", error);
        alert("Failed to book appointment. Please try again later.");
    }
});
