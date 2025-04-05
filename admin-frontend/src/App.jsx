import { Toaster } from "react-hot-toast";
import "./App.css";
import NotificationForm from "./NotificationForm";

function App() {
  return (
    <>
      <div>
        <NotificationForm />
        <Toaster />
      </div>
    </>
  );
}

export default App;
