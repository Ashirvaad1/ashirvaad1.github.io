importScripts('https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyD6g1-cHCBJ-lhwFrr8L1ANehyGwkHjw6k",
    authDomain: "hospital-47fce.firebaseapp.com",
    projectId: "hospital-47fce",
    storageBucket: "hospital-47fce.appspot.com",
    messagingSenderId: "54581383019",
    appId: "1:54581383019:web:07333ea8bf1594999b062e",
    measurementId: "G-4EB69QFJDZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon || '/hospital-logo.png'
    });
});
