import { db, addDoc, collection } from "./script.js";

document.getElementById("appointment-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const patientName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const age = parseInt(document.getElementById("age").value);
    const purpose = document.getElementById("purpose").value;
    const gender = document.getElementById("gender").value === "Male";
    const time = new Date(document.getElementById("date").value);

    await setDoc(doc(db, "Life Hospital", "Appointments", patientName), {
        "Age": age,
        "E-mail": email,
        "Gender": gender,
        "Phone number": phone,
        "Purpose": purpose,
        "Time": time,
        "Token": Math.floor(Math.random() * 100) + 1,
        "Last Visited": new Date()
    });

    alert("Appointment booked successfully!");
});
















<!DOCTYPE html>
<html lang="en-IN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Life Hospital - Best Healthcare Services</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <nav>
        <div class="logo">Life Hospital</div>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#doctors">Doctors</a></li>
            <li><a href="#appointments">Appointments</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="appointment.html" class="btn">Book Appointment</a>
    </nav>
</header>

<section id="about">
    <h2>About Our Hospital</h2>
    <p id="hospital-description">Loading...</p>
    <p><b>Departments:</b> <span id="hospital-departments">Loading...</span></p>
</section>

<section id="doctors">
    <h2>Meet Our Doctors</h2>
    <div id="doctor-list">Loading...</div>
</section>

<section id="appointments">
    <h2>Recent Appointments</h2>
    <div id="appointments-list">Loading...</div>
</section>

<section id="contact">
    <h2>Contact Us</h2>
    <p id="hospital-contact">Loading...</p>
</section>

<footer>
    <p>© 2025 Life Hospital | All Rights Reserved</p>
</footer>

<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// 🔹 Firebase Configuration
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

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Fetch Hospital Information
async function loadHospitalInfo() {
    try {
        const docRef = doc(db, "Life Hospital", "Information");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            document.getElementById("hospital-description").innerText = data.Description || "No description available.";
            document.getElementById("hospital-departments").innerText = data.Departments?.join(", ") || "No departments found.";
            document.getElementById("hospital-contact").innerHTML = `
                📍 Location: ${data.Location?.latitude}, ${data.Location?.longitude} <br>
                📅 Open: ${data.Days?.join(", ")} (${data.Time}) <br>
                ✉ Email: ${data["E-mail"] || "Not available"} <br>
                📞 Phone: ${data["Phone number"] || "Not available"}
            `;
        } else {
            console.log("No hospital information found.");
        }
    } catch (error) {
        console.error("Error loading hospital info:", error);
    }
}

// 🔹 Fetch Doctors
async function loadDoctors() {
    try {
        console.log("Fetching doctors...");

        const doctorsList = document.getElementById("doctor-list");
        doctorsList.innerHTML = ""; // Clear existing content

        // Fetch the "Doctors" document
        const docRef = doc(db, "Life Hospital", "Doctors");
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.warn("No doctors found in Firestore!");
            doctorsList.innerHTML = "<p>No doctors found.</p>";
            return;
        }

        const doctorsData = docSnap.data();

        // Iterate over the fields (doctors) in the document
        for (const [doctorName, doctorDetails] of Object.entries(doctorsData)) {
            console.log("Doctor Data:", doctorName, doctorDetails); // Debugging

            doctorsList.innerHTML += `
                <div class="doctor-card">
                    <h3>${doctorName}</h3>
                    <p><b>Speciality:</b> ${doctorDetails.Speciality || "Not available"}</p>
                    <p><b>Description:</b> ${doctorDetails.Description || "No details"}</p>
                    <p><b>Availability:</b> ${doctorDetails.Availability?.join(", ") || "No schedule available"}</p>
                </div>
            `;
        }

        console.log("Doctors loaded successfully.");
    } catch (error) {
        console.error("Error loading doctors:", error);
    }
}

// 🔹 Fetch Appointments
async function loadAppointments() {
    try {
        console.log("Fetching appointments...");

        const appointmentsList = document.getElementById("appointments-list");
        appointmentsList.innerHTML = ""; // Clear existing content

        // Fetch the "Appointments" document
        const docRef = doc(db, "Life Hospital", "Appointments");
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.warn("No appointments found in Firestore!");
            appointmentsList.innerHTML = "<p>No appointments found.</p>";
            return;
        }

        const appointmentsData = docSnap.data();

        // Iterate over the fields (appointments) in the document
        for (const [patientName, patientDetails] of Object.entries(appointmentsData)) {
            console.log("Appointment Data:", patientName, patientDetails); // Debugging

            appointmentsList.innerHTML += `
                <div class="appointment-card">
                    <h3>Patient: ${patientName}</h3>
                    <p><b>Age:</b> ${patientDetails.Age || "N/A"}</p>
                    <p><b>Email:</b> ${patientDetails["E-mail"] || "N/A"}</p>
                    <p><b>Phone:</b> ${patientDetails["Phone number"] || "N/A"}</p>
                    <p><b>Gender:</b> ${patientDetails.Gender ? "Male" : "Female"}</p>
                    <p><b>Purpose:</b> ${patientDetails.Purpose || "N/A"}</p>
                    <p><b>Token:</b> ${patientDetails.Token || "N/A"}</p>
                    <p><b>Last Visited:</b> ${patientDetails["Last Visited"] ? new Date(patientDetails["Last Visited"].seconds * 1000).toLocaleString() : "N/A"}</p>
                    <p><b>Appointment Time:</b> ${patientDetails.Time ? new Date(patientDetails.Time.seconds * 1000).toLocaleString() : "N/A"}</p>
                </div>
            `;
        }

        console.log("Appointments loaded successfully.");
    } catch (error) {
        console.error("Error loading appointments:", error);
    }
}

// ✅ Load Data When Page Loads
window.onload = () => {
    console.log("Loading hospital data...");
    loadHospitalInfo();
    loadDoctors();
    loadAppointments();
};

</script>

</body>
</html>









* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    background-color: #f4f4f9;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 50px;
    background: #007BFF;
    color: white;
}

nav .logo {
    font-size: 22px;
    font-weight: bold;
}

nav ul {
    list-style: none;
    display: flex;
}

nav ul li {
    margin: 0 15px;
}

nav ul li a {
    text-decoration: none;
    color: white;
}

.btn {
    padding: 10px 20px;
    background: #28a745;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}

section {
    padding: 50px 20px;
    text-align: center;
}

.doctor-list {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.doctor-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 250px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}