const admin = require("./firebase.js");

class NotificationService {
  static sendNotification(token, title, body) {
    const message = {
      data: {
        title: title,
        body: body,
        icon: "/firebase-logo.png",
      },
      token: token,
    };

    return admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
        return response;
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  }
}

module.exports = NotificationService;
