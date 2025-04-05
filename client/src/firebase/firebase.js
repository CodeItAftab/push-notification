// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const vapidKey =
  "BPDQPncBxCirdB9YQU7dZ-MGO3AyqwvaYYvH6yYAdMd8DjcshQdvUSAa1LShBNZxKSG3n1LX9NUkhFVWm5pu4HM";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
// Request permission to send notifications

export const requestFCMToken = async () => {
  return Notification.requestPermission().then(async (permission) => {
    if (permission === "granted") {
      return getToken(messaging, { vapidKey });
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
};
