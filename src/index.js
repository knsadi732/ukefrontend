import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// Initialize root
const root = createRoot(document.getElementById("root")); 
root.render(
  <Router>
    <App />
  </Router>
);


