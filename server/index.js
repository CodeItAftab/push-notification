const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const NotificationService = require("./notification.js");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-notification", async (req, res) => {
  const { token, title, icon, message: body } = req.body;

  console.log("Received token:", token);

  try {
    const response = await NotificationService.sendNotification(
      token,
      title,
      body,
      icon
    );
    console.log("Notification sent successfully:", response);
    res.status(200).json({
      message: "Notification sent successfully",
      response: response,
      success: true,
    });
  } catch (error) {
    console.error("Error in /send-notification route:", error);
    res.status(500).json({
      message: "Error sending notification",
      error: error.message,
      success: false,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port", process.env.PORT || 3000);
});
