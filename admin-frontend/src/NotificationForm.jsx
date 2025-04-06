import React from "react";

function NotificationForm() {
  const [notificationTitle, setNotificationTitle] = React.useState("");
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [notificationIcon, setNotificationIcon] = React.useState("");
  const [fcmToken, setFcmToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const notificationData = {
      title: notificationTitle,
      message: notificationMessage,
      icon: notificationIcon,
      token: fcmToken,
    };
    console.log("Notification Data:", notificationData);
    // Here you would typically send the data to your backend or service
    try {
      const response = await fetch(
        // "http://localhost:8080/send-notification",
        "https://push-notification-xo5f.onrender.com/send-notification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationData),
        }
      );

      const data = await response.json();
      console.log("Response from server:", data);
      if (data.success) {
        // Show success message or toast notification
        console.log("Notification sent successfully!");
      } else {
        // Show error message or toast notification
        console.error("Failed to send notification:", data.message);
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setNotificationTitle("");
    setNotificationMessage("");
    setNotificationIcon("");
  };
  React.useEffect(() => {
    // Reset the form when the component mounts
    handleReset();
  }, []);

  return (
    <div>
      <form className="container mt-5" onSubmit={handleSubmit}>
        <h2 className="mb-4">Send Notification</h2>
        <div className="mb-3">
          <label htmlFor="notificationTitle" className="form-label">
            Notification Title
          </label>
          <input
            type="text"
            className="form-control"
            id="notificationTitle"
            placeholder="Enter notification title"
            required
            value={notificationTitle}
            onChange={(e) => setNotificationTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="notificationMessage" className="form-label">
            Notification Message
          </label>
          <textarea
            className="form-control"
            id="notificationMessage"
            rows="3"
            placeholder="Enter notification message"
            required
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
          ></textarea>
        </div>
        {/* notification image icon  url*/}
        <div className="mb-3">
          <label htmlFor="notificationIcon" className="form-label">
            Notification Icon URL
          </label>
          <input
            type="url"
            className="form-control"
            id="notificationIcon"
            placeholder="Enter notification icon URL"
            value={notificationIcon}
            onChange={(e) => setNotificationIcon(e.target.value)}
          />
        </div>
        {/* FCM token */}
        <div className="mb-3">
          <label htmlFor="fcmToken" className="form-label">
            FCM Token
          </label>
          <input
            type="text"
            className="form-control"
            id="fcmToken"
            placeholder="Enter FCM token"
            required
            value={fcmToken}
            onChange={(e) => setFcmToken(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {loading ? "Sending..." : "Send Notification"}
        </button>
        <button
          type="reset"
          className="btn btn-secondary ms-2"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default NotificationForm;
