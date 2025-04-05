/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCDcieVMZwjEhPKYPYwMkNNgW2qpi0LflU",
  authDomain: "notification-495f5.firebaseapp.com",
  projectId: "notification-495f5",
  storageBucket: "notification-495f5.firebasestorage.app",
  messagingSenderId: "629777589006",
  appId: "1:629777589006:web:a9e02dc2d4af3096dced5f",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Service Worker: Message received in background:", payload);
  // Customize notification here
  const notificationTitle = payload.data.title || "Default Title";
  const notificationOptions = {
    body: payload.data.body || "Default body text",
    icon: payload.data.icon || "vite.svg",
    image: payload.data.image || "/custom-image.png",
    actions: [
      {
        action: "open_url",
        title: "View Details",
        type: "text",
        icon: "/action-icon.png", // Optional icon for the button
        // send output to the server
        url: payload.data.click_action || "/",
      },
      {
        action: "dismiss",
        title: "Dismiss",
        icon: "/dismiss-icon.png", // Optional icon for the button
      },
    ],
    data: {
      url: payload.data.click_action || "http://localhost:5173",
    },
  };

  console.log("Notification Title: ", notificationTitle);
  console.log("Notification Options: ", notificationOptions);

  // Show the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click events
self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked: ", event.notification);
  event.notification.close(); // Close the notification

  if (event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});
