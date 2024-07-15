import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./components/Authcontext.jsx"; // Menggunakan AuthProvider dari AuthContext.jsx

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      {/* Menggunakan AuthProvider disini */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
