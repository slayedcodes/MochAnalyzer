import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";
import RTL from "./Themes/RTL.jsx";
import App from "./App.jsx";
import "./main.scss";
import { StyledEngineProvider } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <RTL>
    <SnackbarProvider
      maxSnack={5}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <StyledEngineProvider injectFirst>
        <StrictMode>
          <App />
        </StrictMode>
      </StyledEngineProvider>
    </SnackbarProvider>
  </RTL>
);
