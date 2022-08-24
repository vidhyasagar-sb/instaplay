import "../src/styles/_common.scss";
import AppRoutes from "./routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer theme="dark" position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
