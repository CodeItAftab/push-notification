import "./App.css";
import { useCallback, useState } from "react";
import { requestFCMToken } from "./firebase/firebase";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFCMToken = useCallback(async () => {
    if ("serviceWorker" in navigator) {
      try {
        setLoading(true);
        // Wait for the service worker to be ready
        const registration = await navigator.serviceWorker.ready;
        console.log("Service Worker is active:", registration);

        // Call the function to request the FCM token
        const token = await requestFCMToken(registration);
        toast.success("Token generated successfully");
        setToken(token);
      } catch (err) {
        console.error("Error ensuring Service Worker is active:", err);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Service Worker is not supported in this browser.");
      setLoading(false);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token).then(() => {
      console.log("Token copied to clipboard");
    });
  };
  const handleCopy = () => {
    if (token) {
      copyToClipboard();
      toast.success("Token copied to clipboard");
    }
  };

  return (
    <>
      {/* heading for fcm token */}
      <h1 style={{ marginBottom: "4rem" }}>FCM TOKEN GENERATOR</h1>
      {!token && (
        <button onClick={fetchFCMToken}>
          {loading ? "Loading..." : "Get FCM Token"}
        </button>
      )}
      {token && (
        <>
          <p
            style={{
              wordBreak: "break-all",
              padding: "2rem",
              backgroundColor: "white",
              borderRadius: "8px",
              color: "#333",
            }}
            className="read-the-docs"
          >
            {token ? token : "Token Not Available"}
          </p>
          <button onClick={handleCopy}>Copy</button>

          {/* visit here to check notification */}
          {token && (
            <div style={{ marginTop: "2rem" }}>
              <a
                href={import.meta.env.VITE_NOTIFICATION_API_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Visit here to check notification
              </a>
            </div>
          )}
        </>
      )}
      <Toaster />
    </>
  );
}

export default App;
