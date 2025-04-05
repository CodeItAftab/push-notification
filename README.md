# Push Notification System

This project implements a **Push Notification System** using **Firebase Cloud Messaging (FCM)**. It includes:

1. **Admin Frontend**: A React-based admin panel to manage and send notifications.
2. **Client Frontend**: A React-based client app to receive and display notifications.
3. **Backend**: A Node.js server to handle notification logic and interact with Firebase.

---

## Features

- **Admin Frontend**:
  - Send notifications to single or multiple devices.
  - Customize notification content (title, body, icon, actions, etc.).
  - View logs of sent notifications (optional).

- **Client Frontend**:
  - Receive notifications in the foreground or background.
  - Display actionable notifications with buttons (e.g., "View Details", "Dismiss").
  - Handle notification clicks and perform actions.

- **Backend**:
  - Manage notification logic using Firebase Admin SDK.
  - Support for single-device and multi-device notifications.
  - Dynamic notification payloads with custom data.

---

## Project Structure

