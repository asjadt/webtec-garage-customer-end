// ===========================================
// #00101
// ===========================================
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-quill/dist/quill.snow.css";

import { ThemeProvider } from "@material-tailwind/react";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";

import { LoadScript } from "@react-google-maps/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-tree-graph/dist/style.css";
import App from "./App";
import "./calendar.css";
import CustomLoading from "./components/CustomLoading";
import ToastProvider from "./components/Toast-Notification/ToastProvider";

// SETTING API BASE URL
axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`;

// TANSTACK QUERY SETUP
const queryClient = new QueryClient();

// REACT ROUTER

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}
      libraries={["places"]}
      loadingElement={<CustomLoading />}
    >
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Toaster position="top-right" reverseOrder={false} />
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </ToastProvider>
    </LoadScript>
  </React.StrictMode>
);
